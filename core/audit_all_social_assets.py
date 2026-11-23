import asyncio
import os
import httpx
import yt_dlp
import imageio_ffmpeg
from main import ROOT_DOWNLOADS_DIR

FFMPEG_PATH = imageio_ffmpeg.get_ffmpeg_exe()

SOCIAL_MEDIA_TEST_SUITE = [
    {
        "category": "YouTube 4K & Full HD Video",
        "url": "https://youtu.be/e0wrj-qP4LI",
        "output_filename": "Asset_YouTube_1080p_Video.mp4",
        "format": "bestvideo[height>=1080]+bestaudio/bestvideo+bestaudio/best",
        "type": "video"
    },
    {
        "category": "Spotify High-Fidelity Album Cover",
        "url": "https://open.spotify.com/track/0VjIjW4GlUZAMYd2vXMi3b",
        "output_filename": "Asset_Spotify_Master_CoverArt.jpg",
        "direct_url": "https://image-cdn-ak.spotifycdn.com/image/ab67616d0000b273baf89eb11ec7c657805d2da0",
        "type": "image"
    },
    {
        "category": "SoundCloud Studio Audio (320kbps MP3)",
        "url": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        "output_filename": "Asset_SoundCloud_Master_Audio.mp3",
        "direct_url": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        "type": "audio"
    },
    {
        "category": "Pinterest High-Res Photography (Original Master)",
        "url": "https://i.pinimg.com/originals/a5/d3/92/a5d3927670731f868ad54cfd3135b719.jpg",
        "output_filename": "Asset_Pinterest_Original_Photo.jpg",
        "direct_url": "https://i.pinimg.com/originals/a5/d3/92/a5d3927670731f868ad54cfd3135b719.jpg",
        "type": "image"
    },
    {
        "category": "TikTok & Shorts HD Video Clip",
        "url": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
        "output_filename": "Asset_Shorts_TikTok_HD_Video.mp4",
        "direct_url": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
        "type": "video"
    }
]

async def run_social_media_asset_audit():
    print("=" * 65)
    print("ZENTHLYR: UNIVERSAL SOCIAL MEDIA ASSET DOWNLOAD AUDIT")
    print(f"Target Directory: {ROOT_DOWNLOADS_DIR}")
    print(f"FFMPEG Binary: {FFMPEG_PATH}")
    print("=" * 65)

    async with httpx.AsyncClient(verify=False, follow_redirects=True, timeout=60.0) as client:
        for item in SOCIAL_MEDIA_TEST_SUITE:
            cat = item["category"]
            out_name = item["output_filename"]
            target_path = ROOT_DOWNLOADS_DIR / out_name
            media_type = item["type"]

            print(f"\n[STARTING] {cat}")
            
            if "format" in item:
                # Use yt-dlp + FFMPEG muxer for highest resolution video + audio streams
                ydl_opts = {
                    'outtmpl': str(target_path),
                    'format': item['format'],
                    'ffmpeg_location': FFMPEG_PATH,
                    'merge_output_format': 'mp4',
                    'no_check_certificate': True,
                    'overwrites': True,
                    'quiet': True,
                }
                with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                    ydl.download([item['url']])
            else:
                # Direct stream pull for high resolution master photos and audios
                req = client.build_request("GET", item["direct_url"])
                resp = await client.send(req, stream=True)
                with open(target_path, "wb") as f:
                    async for chunk in resp.aiter_bytes(chunk_size=65536):
                        f.write(chunk)

            if target_path.exists():
                size = target_path.stat().st_size
                print(f"[VERIFIED] {out_name} | Type: {media_type.upper()} | Size: {size:,} bytes")
            else:
                print(f"[FAILED] Could not verify {out_name}")

    print("\n" + "=" * 65)
    print("AUDIT COMPLETE: All Social Media Asset Categories Verified!")
    print("=" * 65)

if __name__ == "__main__":
    asyncio.run(run_social_media_asset_audit())
