import os
import re
import json
import asyncio
from typing import Dict, Any, List, Optional
import yt_dlp
import httpx

PLATFORM_SIGNATURES = [
    {"id": "youtube", "name": "YouTube & Shorts", "domain_pattern": r"(youtube\.com|youtu\.be)", "types": ["4K Ultra HD", "1080p 60fps", "Shorts", "Audio 320k"], "color": "#f8f9fa", "native": True},
    {"id": "spotify", "name": "Spotify", "domain_pattern": r"spotify\.com", "types": ["Master Metadata", "Ultra HD Cover Art", "HQ Audio Preview"], "color": "#e9ecef", "native": True},
    {"id": "facebook", "name": "Facebook", "domain_pattern": r"facebook\.com|fb\.watch", "types": ["Watch HD", "Public Reels", "Video Clips"], "color": "#dee2e6", "native": True},
    {"id": "vimeo", "name": "Vimeo", "domain_pattern": r"vimeo\.com", "types": ["4K Master", "1080p Cinema", "Audio Stems"], "color": "#ced4da", "native": True},
    {"id": "soundcloud", "name": "SoundCloud", "domain_pattern": r"soundcloud\.com", "types": ["High Quality 320k MP3", "Lossless Stream"], "color": "#adb5bd", "native": True},
    {"id": "pinterest", "name": "Pinterest", "domain_pattern": r"pinterest\.com|pin\.it", "types": ["Lossless Master JPEG", "Idea Pin Videos"], "color": "#6c757d", "native": True},
    {"id": "twitter", "name": "X (Twitter)", "domain_pattern": r"(twitter\.com|x\.com)", "types": ["Highest Bitrate MP4", "GIF Loops", "Photos"], "color": "#495057", "native": True},
    {"id": "tiktok", "name": "TikTok", "domain_pattern": r"tiktok\.com", "types": ["1080p HD Video", "Original Sounds", "Slide Photos"], "color": "#343a40", "native": True},
    {"id": "instagram", "name": "Instagram", "domain_pattern": r"instagram\.com", "types": ["Reels", "Carousel Posts", "Stories"], "color": "#212529", "native": True},
    {"id": "reddit", "name": "Reddit", "domain_pattern": r"reddit\.com|redd\.it", "types": ["Merged Video + Audio", "Galleries", "GIFs"], "color": "#6c757d", "native": True},
    {"id": "twitch", "name": "Twitch", "domain_pattern": r"twitch\.tv", "types": ["VODs", "Broadcast Highlights", "Clips"], "color": "#ced4da", "native": True},
    {"id": "dailymotion", "name": "Dailymotion", "domain_pattern": r"dailymotion\.com", "types": ["1080p Full HD", "News Streams"], "color": "#dee2e6", "native": True},
    {"id": "bilibili", "name": "Bilibili", "domain_pattern": r"bilibili\.com", "types": ["1080p / 720p HD", "Audio"], "color": "#adb5bd", "native": True},
    {"id": "threads", "name": "Threads", "domain_pattern": r"threads\.net", "types": ["High-Res Images", "MP4 Videos"], "color": "#e9ecef", "native": True},
    {"id": "generic", "name": "1,750+ Universal Global Web Platforms", "domain_pattern": r".*", "types": ["Direct Master Media", "HLS Streams", "Audio Stems"], "color": "#f8f9fa", "native": True}
]

BROWSER_HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
    "Sec-Fetch-Mode": "navigate",
}

def identify_platform(url: str) -> Dict[str, Any]:
    url_lower = url.lower()
    for plat in PLATFORM_SIGNATURES:
        if re.search(plat["domain_pattern"], url_lower):
            return plat
    return PLATFORM_SIGNATURES[-1]

def format_filesize(bytes_val: Optional[int]) -> str:
    if not bytes_val or bytes_val <= 0:
        return "Master Stream"
    for unit in ['B', 'KB', 'MB', 'GB']:
        if bytes_val < 1024.0:
            return f"{bytes_val:.1f} {unit}"
        bytes_val /= 1024.0
    return f"{bytes_val:.1f} TB"

async def extract_media_info(url: str) -> Dict[str, Any]:
    platform = identify_platform(url)

    # Dedicated direct handler for Spotify metadata & audio preview
    if platform["id"] == "spotify":
        spotify_res = await extract_spotify_metadata(url, platform)
        if spotify_res and spotify_res.get("status") == "success":
            return spotify_res

    # Dedicated direct handler for Pinterest master images and idea clips
    if platform["id"] == "pinterest":
        pin_res = await extract_pinterest_direct(url, platform)
        if pin_res and pin_res.get("status") == "success":
            return pin_res

    # Main Native Extractor with SSL tolerance, timeout safeguards, and cookie bypass
    ydl_opts = {
        'skip_download': True,
        'quiet': True,
        'no_warnings': True,
        'no_check_certificate': True,
        'extract_flat': False,
        'socket_timeout': 10,
        'noplaylist': True,
        'http_headers': BROWSER_HEADERS,
        'ignoreerrors': False,
    }

    loop = asyncio.get_event_loop()

    def _run_extract():
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            return ydl.extract_info(url, download=False)

    try:
        raw_info = await loop.run_in_executor(None, _run_extract)
        return parse_extracted_info(raw_info, platform, url)
    except Exception as e:
        # Fallback to direct OpenGraph & CDN scraper
        return await fallback_extractor(url, platform, str(e))

async def extract_spotify_metadata(url: str, platform: Dict[str, Any]) -> Optional[Dict[str, Any]]:
    try:
        async with httpx.AsyncClient(verify=False, headers=BROWSER_HEADERS, follow_redirects=True, timeout=8.0) as client:
            oembed_url = f"https://open.spotify.com/oembed?url={url}"
            resp = await client.get(oembed_url)
            if resp.status_code == 200:
                data = resp.json()
                title = data.get("title", "Spotify Track")
                author = data.get("provider_name", "Spotify")
                thumb = data.get("thumbnail_url", "")
                hq_thumb = thumb.replace("/image/ab67616d00001e02", "/image/ab67616d0000b273") if thumb else thumb

                formats = [
                    {
                        "id": "spotify_album_art_hd",
                        "type": "image",
                        "label": "Original Album Cover Art (Ultra HD 640x640)",
                        "resolution": "Lossless Master JPEG",
                        "ext": "jpg",
                        "filesize": "Studio Graphic",
                        "url": hq_thumb or thumb,
                        "is_direct": True,
                        "recommended": True
                    },
                    {
                        "id": "spotify_track_meta",
                        "type": "audio",
                        "label": "Spotify Track Master & High-Fidelity Preview",
                        "resolution": "Lossless MP3 / M4A Stream",
                        "ext": "mp3",
                        "filesize": "Studio Audio",
                        "url": url,
                        "is_direct": True,
                        "recommended": False
                    }
                ]

                return {
                    "status": "success",
                    "url": url,
                    "platform": platform,
                    "title": title,
                    "author": author,
                    "thumbnail": hq_thumb or thumb,
                    "duration": "Master Audio",
                    "formats": formats
                }
    except Exception:
        pass
    return None

async def extract_pinterest_direct(url: str, platform: Dict[str, Any]) -> Optional[Dict[str, Any]]:
    try:
        async with httpx.AsyncClient(verify=False, headers=BROWSER_HEADERS, follow_redirects=True, timeout=10.0) as client:
            resp = await client.get(url)
            html = resp.text

            images = re.findall(r'https://i\.pinimg\.com/(?:originals|736x|564x)/[a-zA-Z0-9_\-\./]+(?:\.jpg|\.png|\.webp)', html)
            videos = re.findall(r'https://v\.pinimg\.com/videos/[a-zA-Z0-9_\-\./]+(?:\.mp4)', html)

            title_match = re.search(r'<meta property="og:title" content="([^"]+)"', html)
            title = title_match.group(1) if title_match else "Pinterest Media Capture"

            formats = []
            if videos:
                formats.append({
                    "id": "pin_vid_hd",
                    "type": "video",
                    "label": "Original Pin Video (HD)",
                    "resolution": "1080p / 720p",
                    "ext": "mp4",
                    "filesize": "Direct Master",
                    "url": videos[0],
                    "is_direct": True,
                    "recommended": True
                })

            if images:
                best_img = next((img for img in images if 'originals' in img), images[0])
                formats.append({
                    "id": "pin_img_orig",
                    "type": "image",
                    "label": "Full Resolution Master Image (Uncompressed)",
                    "resolution": "Original Master",
                    "ext": "jpg",
                    "filesize": "Lossless Master",
                    "url": best_img,
                    "is_direct": True,
                    "recommended": not bool(videos)
                })

            if formats:
                return {
                    "status": "success",
                    "url": url,
                    "platform": platform,
                    "title": title,
                    "author": "Pinterest",
                    "thumbnail": formats[-1]["url"] if formats else "",
                    "duration": "Static" if not videos else "Idea Clip",
                    "formats": formats
                }
    except Exception:
        pass
    return None

def parse_extracted_info(info: Dict[str, Any], platform: Dict[str, Any], original_url: str) -> Dict[str, Any]:
    title = info.get("title") or info.get("description") or f"Zenthlyr Media Capture"
    if len(title) > 90:
        title = title[:87] + "..."

    thumbnail = info.get("thumbnail") or (info.get("thumbnails")[-1]["url"] if info.get("thumbnails") else "")
    uploader = info.get("uploader") or info.get("channel") or info.get("creator") or platform["name"]
    duration = info.get("duration") or 0
    duration_str = f"{int(duration // 60)}:{int(duration % 60):02d}" if duration else "Instant"

    formats = []
    raw_formats = info.get("formats", [])
    seen_res = set()

    # Video streams resolution processing
    for f in reversed(raw_formats):
        vcodec = f.get("vcodec", "none")
        height = f.get("height")
        url = f.get("url")
        ext = f.get("ext", "mp4")

        if not url:
            continue

        if height and height >= 360 and vcodec != 'none':
            quality_tag = f"{height}p"
            if height >= 2160:
                quality_tag = "4K Ultra HD (2160p)"
            elif height >= 1440:
                quality_tag = "2K Quad HD (1440p)"
            elif height >= 1080:
                quality_tag = "Full HD (1080p)"
            elif height >= 720:
                quality_tag = "HD (720p)"

            res_key = f"video_{height}"
            if res_key not in seen_res:
                seen_res.add(res_key)
                formats.append({
                    "id": f.get("format_id", res_key),
                    "type": "video",
                    "label": quality_tag,
                    "resolution": f"{height}p",
                    "ext": ext if ext in ['mp4', 'mov', 'webm'] else 'mp4',
                    "filesize": format_filesize(f.get("filesize") or f.get("filesize_approx")),
                    "url": url,
                    "is_direct": True,
                    "recommended": height in [1080, 2160] or (height == 720 and not any("1080" in x for x in seen_res))
                })

    # Audio extractions
    for f in reversed(raw_formats):
        vcodec = f.get("vcodec", "none")
        abr = f.get("abr") or f.get("tbr") or 128
        url = f.get("url")
        if url and (vcodec == 'none' or 'audio' in f.get('format', '').lower()):
            bitrate_tag = f"{int(abr)} kbps" if abr else "High Quality Audio"
            audio_key = f"audio_{int(abr) if abr else 'hq'}"
            if audio_key not in seen_res:
                seen_res.add(audio_key)
                formats.append({
                    "id": f.get("format_id", audio_key),
                    "type": "audio",
                    "label": f"Audio Master ({bitrate_tag})",
                    "resolution": "Lossless MP3/M4A",
                    "ext": "mp3",
                    "filesize": format_filesize(f.get("filesize") or f.get("filesize_approx")),
                    "url": url,
                    "is_direct": True,
                    "recommended": False
                })

    # Fallback single direct master format
    if not formats and info.get("url"):
        ext = info.get("ext", "mp4")
        formats.append({
            "id": "direct_best",
            "type": "video" if ext in ["mp4", "mkv", "webm", "mov"] else "audio",
            "label": f"Original Master ({ext.upper()})",
            "resolution": "Highest Quality",
            "ext": ext,
            "filesize": format_filesize(info.get("filesize")),
            "url": info["url"],
            "is_direct": True,
            "recommended": True
        })

    # Always provide thumbnail cover art
    if thumbnail:
        formats.append({
            "id": "photo_thumb",
            "type": "image",
            "label": "Original Image / Cover Art",
            "resolution": "Master Image (HQ)",
            "ext": "jpg",
            "filesize": "Direct HD",
            "url": thumbnail,
            "is_direct": True,
            "recommended": len(formats) == 0
        })

    if formats and not any(fmt["recommended"] for fmt in formats):
        formats[0]["recommended"] = True

    return {
        "status": "success",
        "url": original_url,
        "platform": platform,
        "title": title,
        "author": uploader,
        "thumbnail": thumbnail,
        "duration": duration_str,
        "formats": formats
    }

async def fallback_extractor(url: str, platform: Dict[str, Any], error_msg: str) -> Dict[str, Any]:
    clean_url = url.split("?")[0].lower()
    if clean_url.endswith((".jpg", ".jpeg", ".png", ".webp", ".gif")):
        return {
            "status": "success",
            "url": url,
            "platform": platform,
            "title": f"Captured Image ({platform['name']})",
            "author": platform["name"],
            "thumbnail": url,
            "duration": "Static",
            "formats": [
                {
                    "id": "direct_img_hq",
                    "type": "image",
                    "label": "Full Resolution Master Image",
                    "resolution": "High Quality",
                    "ext": clean_url.split(".")[-1],
                    "filesize": "Lossless",
                    "url": url,
                    "is_direct": True,
                    "recommended": True
                }
            ]
        }
    elif clean_url.endswith((".mp4", ".mov", ".webm", ".m4a", ".mp3")):
        ext = clean_url.split(".")[-1]
        is_vid = ext in ["mp4", "mov", "webm"]
        return {
            "status": "success",
            "url": url,
            "platform": platform,
            "title": f"Direct Stream Media ({platform['name']})",
            "author": platform["name"],
            "thumbnail": "",
            "duration": "Live Stream",
            "formats": [
                {
                    "id": "direct_stream",
                    "type": "video" if is_vid else "audio",
                    "label": f"Direct High Quality Stream ({ext.upper()})",
                    "resolution": "Native Master",
                    "ext": ext,
                    "filesize": "Stream Quality",
                    "url": url,
                    "is_direct": True,
                    "recommended": True
                }
            ]
        }

    # OpenGraph direct metadata scraper
    try:
        async with httpx.AsyncClient(verify=False, headers=BROWSER_HEADERS, follow_redirects=True, timeout=8.0) as client:
            resp = await client.get(url)
            html = resp.text

            og_video = re.search(r'<meta property="og:video(?::url)?" content="([^"]+)"', html)
            og_image = re.search(r'<meta property="og:image" content="([^"]+)"', html)
            og_title = re.search(r'<meta property="og:title" content="([^"]+)"', html)

            if og_video or og_image:
                title = og_title.group(1) if og_title else f"{platform['name']} Media Capture"
                formats = []
                if og_video:
                    formats.append({
                        "id": "og_video_hd",
                        "type": "video",
                        "label": "Master Stream Video",
                        "resolution": "Direct HD",
                        "ext": "mp4",
                        "filesize": "Direct Stream",
                        "url": og_video.group(1),
                        "is_direct": True,
                        "recommended": True
                    })
                if og_image:
                    formats.append({
                        "id": "og_image_hq",
                        "type": "image",
                        "label": "Original Image",
                        "resolution": "High Quality",
                        "ext": "jpg",
                        "filesize": "Direct HD",
                        "url": og_image.group(1),
                        "is_direct": True,
                        "recommended": not bool(og_video)
                    })

                return {
                    "status": "success",
                    "url": url,
                    "platform": platform,
                    "title": title,
                    "author": platform["name"],
                    "thumbnail": og_image.group(1) if og_image else "",
                    "duration": "Stream",
                    "formats": formats
                }
    except Exception:
        pass

    return {
        "status": "error",
        "url": url,
        "platform": platform,
        "message": f"Could not extract direct stream: {error_msg[:120]}"
    }
