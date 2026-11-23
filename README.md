# ZENTHLYR (visionOS Spatial Universal Media Downloader)

**ZENTHLYR** is an Apple Vision Pro (visionOS) inspired spatial media extraction system engineered with a multi-page React architecture and an ultra-fast Python extraction core.

---

## Visual Design & Architecture
- **visionOS Spatial Paradigm**: No conventional web navbars, headers, or footers. The system floats on an ambient spatial environment with frosted glass panes (`backdrop-blur-3xl`), specular edge highlights, window grab-bar indicators, and a floating **Spatial Navigation Ornament** capsule.
- **Exact Light Steel Color Palette**:
  - `Bright Snow` (`#f8f9fa`)
  - `Platinum` (`#e9ecef`)
  - `Alabaster Grey` (`#dee2e6`)
  - `Pale Slate` (`#ced4da` & `#adb5bd`)
  - `Slate Grey` (`#6c757d`)
  - `Iron Grey` (`#495057`)
  - `Gunmetal` (`#343a40`)
  - `Shadow Grey` (`#212529`)
- **Theme Modes**: Seamless instant switching between **Light Steel Glass** and **Dark Steel Glass**.

---

## Multi-Page Spatial Routes
1. **`/splash`** — visionOS spatial boot sequence and holographic particle calibration.
2. **`/onboarding`** — Multi-step 3D slide deck detailing sub-3s extraction, 4K resolution, lossless audio, and universal compatibility.
3. **`/welcome`** — Spatial landing showcase with capability badges and direct launch trigger.
4. **`/` (Main Deck)** — The core downloader deck: instant URL extraction, clipboard paste listener, 3-second auto-download countdown, and high-quality format matrix (4K, 1080p, 720p, 320kbps MP3 audio, and lossless photo captures).
5. **`/platforms`** — Interactive platform matrix with search and category filters (Instagram, TikTok, YouTube, X, Pinterest, Spotify, Reddit, Threads, Facebook, SoundCloud, Vimeo, and 1800+ sites).
6. **`/history`** — Spatial history vault with one-click re-download and source redirection.
7. **`/preferences`** — Configurable 3-second auto-download countdown, default quality priority, and clipboard settings.
8. **`/settings`** — Diagnostics, system latency, cache flushing, and theme palette controls.
9. **`/profile`** — Spatial identity card, download counters, and feature entitlements.
10. **`/terms` & `/privacy`** — Minimalist spatial legal reading panes.

---

## Quick Start Instructions

### 1. Launch with One Click
Double click `start.bat` in the root folder:
```cmd
start.bat
```

### 2. Manual Start
**Backend**:
```bash
cd backend
python main.py
```
*Runs on `http://127.0.0.1:8000`*

**Frontend**:
```bash
cd frontend
npm run dev
```
*Runs on `http://localhost:5173`*
