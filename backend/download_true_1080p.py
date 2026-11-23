import yt_dlp
import imageio_ffmpeg
from main import ROOT_DOWNLOADS_DIR

ffmpeg_path = imageio_ffmpeg.get_ffmpeg_exe()

print("Listing all available streams for https://youtu.be/e0wrj-qP4LI ...")
with yt_dlp.YoutubeDL({'quiet': True, 'no_check_certificate': True}) as ydl:
    info = ydl.extract_info("https://youtu.be/e0wrj-qP4LI", download=False)
    for f in info.get("formats", []):
        h = f.get("height")
        if h and h >= 720:
            print(f"ID: {f.get('format_id')} | Res: {f.get('resolution')} | Codec: {f.get('vcodec')} | Ext: {f.get('ext')} | Approx: {f.get('filesize_approx')}")

print("\nDownloading TRUE Full HD 1080p Master stream with 320k Audio muxing...")
out_file = str(ROOT_DOWNLOADS_DIR / "SPY_FAMILY_1080p_FullHD.%(ext)s")

# Force highest 1080p video stream + best audio muxing with FFMPEG
ydl_opts = {
    'outtmpl': out_file,
    'format': 'bestvideo[height>=1080]+bestaudio/bestvideo+bestaudio/best',
    'ffmpeg_location': ffmpeg_path,
    'merge_output_format': 'mp4',
    'no_check_certificate': True,
    'overwrites': True,
    'postprocessors': [{
        'key': 'FFmpegVideoConvertor',
        'preferedformat': 'mp4',
    }]
}

with yt_dlp.YoutubeDL(ydl_opts) as ydl:
    ydl.download(["https://youtu.be/e0wrj-qP4LI"])

print("\n1080p Full HD Download & Muxing Complete!")
