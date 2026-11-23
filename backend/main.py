import os
import re
import urllib.parse
from pathlib import Path
from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse, JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import httpx
import yt_dlp
import imageio_ffmpeg
from extractors import extract_media_info, PLATFORM_SIGNATURES

app = FastAPI(
    title="ZENTHLYR Spatial Core API",
    description="Spatial UI High-Fidelity Universal Media Extraction Engine",
    version="1.0.0"
)

ROOT_DOWNLOADS_DIR = Path(__file__).resolve().parent.parent / "downloads"
ROOT_DOWNLOADS_DIR.mkdir(parents=True, exist_ok=True)
FFMPEG_EXE = imageio_ffmpeg.get_ffmpeg_exe()

app.mount("/assets_vault", StaticFiles(directory=str(ROOT_DOWNLOADS_DIR)), name="downloads_vault")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AnalyzeRequest(BaseModel):
    url: str

@app.get("/api/health")
async def health_check():
    return {
        "status": "online",
        "system": "ZENTHLYR",
        "engine": "Spatial UI Core",
        "downloads_dir": str(ROOT_DOWNLOADS_DIR),
        "ffmpeg": bool(FFMPEG_EXE),
        "speed": "sub-3s optimized"
    }

@app.get("/api/platforms")
async def get_platforms():
    return {
        "platforms": PLATFORM_SIGNATURES,
        "total": len(PLATFORM_SIGNATURES)
    }

@app.post("/api/analyze")
async def analyze_url(req: AnalyzeRequest):
    if not req.url or not req.url.strip():
        raise HTTPException(status_code=400, detail="Valid URL must be provided")
    
    url = req.url.strip()
    result = await extract_media_info(url)
    return result

@app.get("/api/downloads-list")
async def list_downloaded_assets():
    files = []
    if ROOT_DOWNLOADS_DIR.exists():
        for f in sorted(ROOT_DOWNLOADS_DIR.glob("*"), key=lambda x: x.stat().st_mtime, reverse=True):
            if f.is_file():
                stat = f.stat()
                ext = f.suffix.lower().replace('.', '')
                media_type = "video" if ext in ['mp4', 'webm', 'mov', 'mkv'] else ("audio" if ext in ['mp3', 'm4a', 'wav', 'ogg'] else "image")
                files.append({
                    "name": f.name,
                    "ext": ext,
                    "type": media_type,
                    "size_bytes": stat.st_size,
                    "preview_url": f"/assets_vault/{f.name}",
                    "created_at": stat.st_mtime
                })
    return {"directory": str(ROOT_DOWNLOADS_DIR), "files": files}

@app.get("/api/download")
async def stream_download(
    url: str = Query(..., description="Direct media target URL or original video URL"),
    filename: str = Query("zenthlyr_media.mp4", description="Output filename for user download"),
    source_url: str = Query(None, description="Original webpage source URL for FFMPEG muxing"),
    format_id: str = Query(None, description="Specific format id selected")
):
    safe_filename = re.sub(r'[^a-zA-Z0-9_\-\.]', '_', filename)
    target_filepath = ROOT_DOWNLOADS_DIR / safe_filename

    # If the file already exists locally with valid media payload (> 50KB), serve directly with instant seeking
    if target_filepath.exists() and target_filepath.stat().st_size > 50000:
        return FileResponse(
            path=str(target_filepath),
            filename=safe_filename,
            media_type="audio/mpeg" if safe_filename.endswith(".mp3") else ("video/mp4" if safe_filename.endswith(".mp4") else "application/octet-stream")
        )

    # 1. SPOTIFY TRACK AUDIO MATCHING & REAL AUDIO EXTRACTION VIA FFMPEG
    if "spotify.com/track/" in url or (source_url and "spotify.com" in source_url.lower()) or (safe_filename.endswith(".mp3") and "spotify" in url.lower()):
        track_query = safe_filename.replace(".mp3", "").replace("_", " ")
        out_template = str(ROOT_DOWNLOADS_DIR / f"{safe_filename.replace('.mp3', '')}.%(ext)s")
        
        ydl_opts = {
            'outtmpl': out_template,
            'format': 'bestaudio/best',
            'ffmpeg_location': FFMPEG_EXE,
            'postprocessors': [{
                'key': 'FFmpegExtractAudio',
                'preferredcodec': 'mp3',
                'preferredquality': '320',
            }],
            'no_check_certificate': True,
            'quiet': True
        }
        
        loop = asyncio.get_event_loop()
        def _download_spotify_audio():
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                ydl.download([f"ytsearch1:{track_query}"])
                
        try:
            await loop.run_in_executor(None, _download_spotify_audio)
            if target_filepath.exists():
                return FileResponse(
                    path=str(target_filepath),
                    filename=safe_filename,
                    media_type="audio/mpeg"
                )
        except Exception:
            pass

    # 2. YOUTUBE & COMPLEX VIDEO / AUDIO SITES (REQUIRE FFMPEG MERGE)
    # If the source is YouTube or another video platform requiring split stream merging
    is_video_platform = source_url and any(domain in source_url.lower() for domain in ["youtube.com", "youtu.be", "vimeo.com", "dailymotion.com", "tiktok.com", "bilibili.com"])
    if is_video_platform and (safe_filename.endswith(".mp4") or safe_filename.endswith(".mp3")):
        out_base = str(ROOT_DOWNLOADS_DIR / safe_filename.rsplit('.', 1)[0])
        out_template = f"{out_base}.%(ext)s"

        if safe_filename.endswith(".mp3"):
            ydl_opts = {
                'outtmpl': out_template,
                'format': 'bestaudio/best',
                'ffmpeg_location': FFMPEG_EXE,
                'postprocessors': [{
                    'key': 'FFmpegExtractAudio',
                    'preferredcodec': 'mp3',
                    'preferredquality': '320',
                }],
                'no_check_certificate': True,
                'quiet': True
            }
        else:
            ydl_opts = {
                'outtmpl': out_template,
                'format': 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/bestvideo+bestaudio/best',
                'merge_output_format': 'mp4',
                'ffmpeg_location': FFMPEG_EXE,
                'no_check_certificate': True,
                'quiet': True
            }

        loop = asyncio.get_event_loop()
        def _mux_stream():
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                ydl.download([source_url])

        try:
            await loop.run_in_executor(None, _mux_stream)
            # Find the generated file
            if target_filepath.exists():
                return FileResponse(
                    path=str(target_filepath),
                    filename=safe_filename,
                    media_type="video/mp4" if safe_filename.endswith(".mp4") else "audio/mpeg"
                )
            # Check for possible variations (e.g. .mp4)
            for cand in ROOT_DOWNLOADS_DIR.glob(f"{safe_filename.rsplit('.', 1)[0]}.*"):
                if cand.is_file() and cand.stat().st_size > 50000:
                    return FileResponse(
                        path=str(cand),
                        filename=cand.name,
                        media_type="video/mp4" if cand.suffix == ".mp4" else "audio/mpeg"
                    )
        except Exception:
            pass

    # 3. DIRECT STREAM / PROXY PIPELINE (FOR DIRECT CDN IMAGES, TIKTOK, PINTEREST, SOUNDCLOUD, ETC.)
    headers = {
        "Content-Disposition": f'attachment; filename="{safe_filename}"'
    }

    client = httpx.AsyncClient(timeout=60.0, follow_redirects=True, verify=False)
    try:
        req = client.build_request("GET", url)
        response = await client.send(req, stream=True)
        local_file = open(target_filepath, "wb")

        async def stream_and_save_generator():
            try:
                async for chunk in response.aiter_bytes(chunk_size=65536):
                    local_file.write(chunk)
                    yield chunk
            finally:
                local_file.close()
                await response.aclose()
                await client.aclose()

        content_type = response.headers.get("content-type", "application/octet-stream")
        return StreamingResponse(
            stream_and_save_generator(),
            media_type=content_type,
            headers=headers
        )
    except Exception as e:
        await client.aclose()
        raise HTTPException(status_code=500, detail=f"Download and storage failed: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
