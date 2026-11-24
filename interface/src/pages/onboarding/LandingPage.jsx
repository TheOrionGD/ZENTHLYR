import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  DownloadCloud, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  Zap, 
  ArrowRight,
  CheckCircle,
  Eye,
  Sliders,
  FolderDown,
  Activity,
  Play
} from 'lucide-react';
import SmoothButton from '../../components/SmoothButton';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen text-[#F4F5F6] flex flex-col items-center">
      {/* 1. Full-Screen 16:9 Hero Section (100svh immersive spatial opening) */}
      <section className="relative w-full min-h-[95vh] flex flex-col items-center justify-center text-center px-4 sm:px-8 py-16 overflow-hidden">
        {/* Soft volumetric depth glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-[#4F5459]/25 rounded-full filter blur-[160px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-4xl mx-auto flex flex-col items-center"
        >
          {/* Spatial OS Pill Badge */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full vision-card border border-[var(--border-glass)] text-xs font-mono text-[#D9DDE0] mb-8 shadow-md">
            <Sparkles className="w-4 h-4 text-[#F4F5F6]" />
            <span className="tracking-wider uppercase">ZENTHLYR &bull; Spatial Operating System</span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-[#F4F5F6] leading-[1.05] mb-6">
            Media, reimagined <br className="hidden sm:inline" />in space.
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-[#AEB5BB] max-w-2xl leading-relaxed mb-10 font-normal">
            An expansive spatial interface for multi-stream media capture. Designed with genuine glass physics, fluid depth, and zero quality loss.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <SmoothButton
              variant="candy"
              size="lg"
              onClick={() => navigate('/deck')}
              icon={<DownloadCloud className="w-5 h-5" />}
              className="px-9 py-4 text-base font-bold"
            >
              Enter Spatial Deck
            </SmoothButton>

            <SmoothButton
              variant="soft"
              size="lg"
              onClick={() => navigate('/vault')}
              icon={<FolderDown className="w-5 h-5" />}
              className="px-8 py-4 text-base font-semibold"
            >
              Open Vault
            </SmoothButton>
          </div>
        </motion.div>

        {/* 2. Floating 2.1:1 Landscape Spatial Preview Panel */}
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.3, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-[92vw] max-w-[1440px] mt-16 vision-window rounded-[42px] p-6 sm:p-10 border border-[var(--border-glass)] shadow-2xl"
        >
          {/* Window Top Bar */}
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-[var(--border-glass)]">
            <div className="flex items-center gap-2.5">
              <div className="w-3.5 h-3.5 rounded-full bg-[#70777E]/70" />
              <div className="w-3.5 h-3.5 rounded-full bg-[#AEB5BB]/70" />
              <div className="w-3.5 h-3.5 rounded-full bg-[#D9DDE0]/80" />
            </div>
            <div className="px-4 py-1 rounded-full bg-[var(--card-glass)] border border-[var(--border-glass)] text-xs font-mono text-[#D9DDE0]">
              LIVE EXTRACTION WORKSPACE
            </div>
            <span className="text-xs font-mono text-[#AEB5BB]">1440 &times; 680 CANVAS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="vision-card rounded-3xl p-6 border border-[var(--border-glass)]">
              <span className="text-[10px] font-mono uppercase text-[#AEB5BB] block mb-2">Protocol Engine</span>
              <h3 className="text-xl font-bold text-[#F4F5F6] mb-2">1,750+ Direct Streams</h3>
              <p className="text-xs text-[#AEB5BB] leading-relaxed">
                Seamlessly extracts master video, split-audio, and originals from YouTube, Spotify, Instagram, TikTok, and X.
              </p>
            </div>

            <div className="vision-card rounded-3xl p-6 border border-[var(--border-glass)]">
              <span className="text-[10px] font-mono uppercase text-[#AEB5BB] block mb-2">Dual-Track Muxing</span>
              <h3 className="text-xl font-bold text-[#F4F5F6] mb-2">Native 4K & 320k MP3</h3>
              <p className="text-xs text-[#AEB5BB] leading-relaxed">
                Bundled zero-install FFMPEG merges DASH/HLS split streams on the fly into standard playable MP4 containers.
              </p>
            </div>

            <div className="vision-card rounded-3xl p-6 border border-[var(--border-glass)]">
              <span className="text-[10px] font-mono uppercase text-[#AEB5BB] block mb-2">Local Storage</span>
              <h3 className="text-xl font-bold text-[#F4F5F6] mb-2">Direct /vault Writes</h3>
              <p className="text-xs text-[#AEB5BB] leading-relaxed">
                Zero third-party intermediary servers. Every asset saves directly to your root vault with instant seeking previews.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3. Cinematic 21:9 Wide Storytelling Section */}
      <section className="w-full py-24 px-4 sm:px-8 flex flex-col items-center">
        <div className="w-[92vw] max-w-[1440px] flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-xl text-left">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#AEB5BB] mb-3 block">
              SPATIAL COMPUTING EXPERIENCE
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-[#F4F5F6] tracking-tight mb-6">
              An operating environment built around flow.
            </h2>
            <p className="text-base text-[#AEB5BB] leading-relaxed mb-8">
              No clustered mobile cards or restrictive desktop viewports. ZENTHLYR spans across your field of view with floating translucent panels, specular glass highlights, and responsive ergonomics designed for high-resolution 1440p and 4K displays.
            </p>
            <SmoothButton
              variant="candy"
              onClick={() => navigate('/platforms')}
              icon={<Layers className="w-4 h-4" />}
            >
              Explore Supported Matrix
            </SmoothButton>
          </div>

          <div className="w-full md:w-[48%] aspect-[16/10] vision-card rounded-[36px] p-8 border border-[var(--border-glass)] shadow-2xl flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-[var(--border-glass)] pb-4">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono font-bold text-[#F4F5F6]">SYSTEM METRICS</span>
              </div>
              <span className="text-xs font-mono text-[#AEB5BB]">Sub-3s Protocol</span>
            </div>

            <div className="space-y-4 my-auto">
              <div className="flex justify-between items-center text-sm font-mono">
                <span className="text-[#AEB5BB]">Extraction Latency</span>
                <span className="font-bold text-[#F4F5F6]">&lt; 2.4s</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-[#31373D] overflow-hidden">
                <div className="w-[92%] h-full bg-gradient-to-r from-[#70777E] to-[#F4F5F6] rounded-full" />
              </div>

              <div className="flex justify-between items-center text-sm font-mono pt-2">
                <span className="text-[#AEB5BB]">Audio Bitrate Fidelity</span>
                <span className="font-bold text-[#F4F5F6]">320 kbps Master</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-[#31373D] overflow-hidden">
                <div className="w-[98%] h-full bg-gradient-to-r from-[#70777E] to-[#F4F5F6] rounded-full" />
              </div>
            </div>

            <div className="text-[11px] font-mono text-[#AEB5BB] pt-4 border-t border-[var(--border-glass)]">
              DUAL-TRACK PIPELINE &bull; FFMPEG NATIVE &bull; LOSSLESS
            </div>
          </div>
        </div>
      </section>

      {/* 4. Full-Width Spatial Footer */}
      <footer className="w-[92vw] max-w-[1440px] py-12 border-t border-[var(--border-glass)] flex flex-col sm:flex-row items-center justify-between text-xs text-[#AEB5BB] gap-4 mb-20">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#AEB5BB]" />
          <span className="font-mono font-bold text-[#F4F5F6]">ZENTHLYR</span>
          <span>&copy; 2026 Spatial Media Systems</span>
        </div>
        <div className="flex items-center gap-6 font-medium">
          <button onClick={() => navigate('/terms')} className="hover:text-[#F4F5F6] transition-colors cursor-pointer">
            Terms of Architecture
          </button>
          <button onClick={() => navigate('/privacy')} className="hover:text-[#F4F5F6] transition-colors cursor-pointer">
            Privacy Policy
          </button>
          <button onClick={() => navigate('/settings')} className="hover:text-[#F4F5F6] transition-colors cursor-pointer">
            Preferences & Settings
          </button>
        </div>
      </footer>
    </div>
  );
}
