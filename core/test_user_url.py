import asyncio
import httpx
from extractors import extract_media_info
from main import ROOT_DOWNLOADS_DIR

target_url = "https://youtu.be/e0wrj-qP4LI"

async def test_and_download():
    print(f"Testing URL: {target_url}")
    res = await extract_media_info(target_url)
    print("Status:", res.get("status"))
    print("Title:", res.get("title"))
    print("Author:", res.get("author"))
    print("Duration:", res.get("duration"))
    formats = res.get("formats", [])
    print(f"Discovered Formats Count: {len(formats)}")
    
    for f in formats:
        print(f"  * [{f.get('type')}] {f.get('label')} ({f.get('resolution')}) | Size: {f.get('filesize')} | Recommended: {f.get('recommended')}")

    if formats:
        best = next((f for f in formats if f.get("recommended")), formats[0])
        safe_title = "".join(c for c in res.get("title", "video") if c.isalnum() or c in " -_").strip()[:40]
        filename = f"{safe_title}.{best['ext']}"
        dest = ROOT_DOWNLOADS_DIR / filename
        
        print(f"\nInitiating direct stream download of [{best['label']}] to {dest.name}...")
        async with httpx.AsyncClient(verify=False, follow_redirects=True, timeout=60.0) as client:
            req = client.build_request("GET", best["url"])
            resp = await client.send(req, stream=True)
            with open(dest, "wb") as f:
                async for chunk in resp.aiter_bytes(chunk_size=65536):
                    f.write(chunk)
                    
        print(f"\nCOMPLETE: Saved to {dest.name} | Total size: {dest.stat().st_size:,} bytes")

if __name__ == "__main__":
    asyncio.run(test_and_download())
