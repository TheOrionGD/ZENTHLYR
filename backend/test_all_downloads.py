import asyncio
import httpx
from extractors import extract_media_info
from main import ROOT_DOWNLOADS_DIR

test_urls = [
    ('Video-YouTube', 'https://www.youtube.com/watch?v=aqz-KE-bpKQ'), # Big Buck Bunny
    ('Audio-Spotify', 'https://open.spotify.com/track/0VjIjW4GlUZAMYd2vXMi3b'), # The Weeknd - Blinding Lights
    ('Photo-Direct', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png'), # Lossless HD photo
    ('Audio-MP3', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'), # 320kbps MP3 Audio
    ('Video-MP4', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4') # HD MP4 video
]

async def run_download_tests():
    print(f"Targeting root download directory: {ROOT_DOWNLOADS_DIR}")
    async with httpx.AsyncClient(verify=False, follow_redirects=True, timeout=60.0) as client:
        for cat, url in test_urls:
            print(f"\n--- Testing [{cat}] with {url} ---")
            info = await extract_media_info(url)
            formats = info.get("formats", [])
            print(f"Status: {info.get('status')} | Title: {info.get('title')} | Formats: {len(formats)}")
            
            if formats:
                fmt = formats[0]
                filename = f"zenthlyr_{cat.lower().replace('-', '_')}.{fmt['ext']}"
                file_dest = ROOT_DOWNLOADS_DIR / filename
                
                print(f"Downloading stream from {fmt['url'][:60]}... -> {filename}")
                req = client.build_request("GET", fmt["url"])
                resp = await client.send(req, stream=True)
                
                with open(file_dest, "wb") as f:
                    async for chunk in resp.aiter_bytes(chunk_size=65536):
                        f.write(chunk)
                        
                print(f"CONFIRMED SAVED: {file_dest.name} | Size: {file_dest.stat().st_size:,} bytes")

if __name__ == "__main__":
    asyncio.run(run_download_tests())
