import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DownloadCloud, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  Zap, 
  ArrowRight, 
  CheckCircle, 
  FolderDown, 
  Activity, 
  Play, 
  Lock, 
  FileText, 
  HelpCircle, 
  Globe, 
  Smartphone, 
  Check, 
  ChevronDown, 
  ExternalLink,
  Cpu,
  Eye,
  Server
} from 'lucide-react';
import SmoothButton from '../../components/SmoothButton';
import { SmoothText } from '../../components/SmoothUIPrimitives';

export default function LandingPage() {
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState(null);
  const [legalModal, setLegalModal] = useState(null); // 'terms' | 'privacy' | 'about' | null

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const FAQS = [
    {
      q: "What is ZENTHLYR and how does it work?",
      a: "ZENTHLYR is a high-performance spatial media capture system. You simply copy any media link from YouTube, Spotify, TikTok, Instagram, Pinterest, or X and paste it into the extraction deck. The engine analyzes the link in under 3 seconds, unlocks the highest original quality (up to 4K video or 320kbps MP3 audio), and saves it straight to your local storage vault with zero ads and zero quality degradation."
    },
    {
      q: "Is it completely free and private?",
      a: "Yes, 100%. ZENTHLYR requires no account creation, no subscriptions, and has no hidden watermarks. Because the core engine runs locally on your machine, your URL history and downloaded media remain entirely private on your device."
    },
    {
      q: "Why do downloaded videos play in Full HD / 4K with audio when other downloaders fail?",
      a: "Many modern platforms like YouTube split high-definition video (1080p, 1440p, 4K) and audio into separate un-muxed streams. Conventional online downloaders fail or drop to 360p. ZENTHLYR includes a bundled FFMPEG stream pipeline that downloads both tracks simultaneously and merges them into a single, crystal-clear MP4 file compatible with every media player."
    },
    {
      q: "Where do my downloaded media files go?",
      a: "Every media file is stored directly in your root 'vault' folder (P:\\Downlayer\\vault). You can open, organize, preview, or move them anytime, or browse them directly in the built-in Downloaded Assets Vault."
    },
    {
      q: "Can I download multiple links at once?",
      a: "Yes! Switch to 'Batch Queue Mode' on the extraction deck, paste multiple URLs (one per line), and click 'Process Batch'. The engine resolves all streams in parallel and lets you grab all masters in a single click."
    }
  ];

  return (
    <div className="w-full min-h-screen text-[#F4F5F6] flex flex-col items-center selection:bg-[#F4F5F6] selection:text-[#31373D]">
      
      {/* 1. IMMERSIVE HERO SECTION (100svh Apple Spatial Presentation) */}
      <section className="relative w-full min-h-[95vh] flex flex-col items-center justify-center text-center px-4 sm:px-8 py-16 overflow-hidden">
        {/* Volumetric Radial Lighting & Depth Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-[#4F5459]/25 rounded-full filter blur-[170px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-4xl mx-auto flex flex-col items-center"
        >
          {/* Spatial OS Pill Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full vision-card border border-[var(--border-glass)] text-xs font-mono text-[#F4F5F6] mb-8 shadow-md"
          >
            <Sparkles className="w-4 h-4 text-[#F4F5F6]" />
            <span className="tracking-wider uppercase font-semibold">ZENTHLYR &bull; SPATIAL COMPUTING RELEASE 2.0</span>
          </motion.div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-[#F4F5F6] spatial-hero-title leading-[1.05] mb-6">
            Media, reimagined <br className="hidden sm:inline" />in space.
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-[#E2E6E9] spatial-hero-subtitle max-w-2xl leading-relaxed mb-10 font-normal">
            A cinematic spatial operating environment for capturing high-definition video, studio audio, and original photography. Engineered with authentic glass depth and sub-3-second velocity.
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
              Browse Asset Vault
            </SmoothButton>
          </div>
        </motion.div>

        {/* Floating 2.1:1 Landscape Spatial Preview Panel (88-92vw, max-w-1440px) */}
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.25, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-[92vw] max-w-[1440px] mt-16 vision-window rounded-[42px] p-6 sm:p-10 border border-[var(--border-glass)] shadow-2xl"
        >
          {/* Window Top Bar with Three Action Dots & Capsule */}
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-[var(--border-glass)]">
            <div className="flex items-center gap-2.5">
              <div className="w-3.5 h-3.5 rounded-full bg-[#70777E]/80" />
              <div className="w-3.5 h-3.5 rounded-full bg-[#AEB5BB]/80" />
              <div className="w-3.5 h-3.5 rounded-full bg-[#D9DDE0]/90" />
            </div>
            <div className="px-5 py-1.5 rounded-full bg-[var(--card-glass)] border border-[var(--border-glass)] text-xs font-mono font-semibold text-[#D9DDE0] tracking-wider">
              ZENTHLYR EXTRACTION CORE // LIVE CANVASES
            </div>
            <span className="text-xs font-mono text-[#AEB5BB]">ULTRAWIDE 1440PX</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="vision-card rounded-3xl p-7 border border-[var(--border-glass)]">
              <span className="text-[10px] font-mono uppercase text-[#AEB5BB] block mb-2 font-bold tracking-wider">PROTOCOL RESOLVER</span>
              <h3 className="text-xl font-bold text-[#F4F5F6] mb-2">1,750+ Platforms</h3>
              <p className="text-xs text-[#AEB5BB] leading-relaxed">
                Direct native stream resolution for YouTube, TikTok, Instagram, Spotify, X, Pinterest, Vimeo, SoundCloud, and Reddit without deceptive redirects.
              </p>
            </div>

            <div className="vision-card rounded-3xl p-7 border border-[var(--border-glass)]">
              <span className="text-[10px] font-mono uppercase text-[#AEB5BB] block mb-2 font-bold tracking-wider">STUDIO MUXER</span>
              <h3 className="text-xl font-bold text-[#F4F5F6] mb-2">True 4K & 320kbps MP3</h3>
              <p className="text-xs text-[#AEB5BB] leading-relaxed">
                Integrated FFMPEG muxing engine automatically merges high-framerate split video streams and lossless audio into standard, playable MP4 files.
              </p>
            </div>

            <div className="vision-card rounded-3xl p-7 border border-[var(--border-glass)]">
              <span className="text-[10px] font-mono uppercase text-[#AEB5BB] block mb-2 font-bold tracking-wider">SECURE STORAGE</span>
              <h3 className="text-xl font-bold text-[#F4F5F6] mb-2">Private Local /vault</h3>
              <p className="text-xs text-[#AEB5BB] leading-relaxed">
                All downloaded media saves directly to your device disk. Instant video seeking, high-resolution photo zooming, and audio waveforms right in your browser.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 2. HOW IT WORKS (SIMPLE 3-STEP EXPLANATION FOR EVERYONE) */}
      <section className="w-full py-28 px-4 sm:px-8 flex flex-col items-center border-t border-[var(--border-glass)] bg-[#31373D]/30">
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-[92vw] max-w-[1440px] text-center mb-16"
        >
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D9DDE0] mb-3 block">
            HOW IT WORKS &bull; 3 SIMPLE STEPS
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-[#F4F5F6] spatial-section-header tracking-tight mb-4">
            Effortless media capture in seconds.
          </h2>
          <p className="text-base sm:text-lg text-[#E2E6E9] spatial-section-desc max-w-xl mx-auto leading-relaxed">
            No complicated technical settings or software installations required. Anyone can extract high-fidelity media in three straightforward steps.
          </p>
        </motion.div>

        <div className="w-[92vw] max-w-[1440px] grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="vision-card rounded-[36px] p-8 sm:p-10 border border-[var(--border-glass)] text-left flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl vision-card flex items-center justify-center mb-6 border border-white/20 text-[#F4F5F6] font-mono text-xl font-bold">
                01
              </div>
              <h3 className="text-2xl font-bold text-[#F4F5F6] mb-3">Copy & Paste URL</h3>
              <p className="text-sm text-[#AEB5BB] leading-relaxed">
                Find a video, music track, or photo on any social media app or website. Copy the link and paste it into the ZENTHLYR extraction bar (or click "Paste" to auto-fill).
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-[var(--border-glass)] text-xs font-mono text-[#AEB5BB]">
              Automatic clipboard listener
            </div>
          </div>

          <div className="vision-card rounded-[36px] p-8 sm:p-10 border border-[var(--border-glass)] text-left flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl vision-card flex items-center justify-center mb-6 border border-white/20 text-[#F4F5F6] font-mono text-xl font-bold">
                02
              </div>
              <h3 className="text-2xl font-bold text-[#F4F5F6] mb-3">Instant Inspection</h3>
              <p className="text-sm text-[#AEB5BB] leading-relaxed">
                Within 2 to 3 seconds, the core resolves the link, verifies media authenticity, and displays available quality formats: 4K Ultra HD, 1080p, 720p, or 320kbps MP3 audio.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-[var(--border-glass)] text-xs font-mono text-[#AEB5BB]">
              Sub-3s multi-platform analysis
            </div>
          </div>

          <div className="vision-card rounded-[36px] p-8 sm:p-10 border border-[var(--border-glass)] text-left flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl vision-card flex items-center justify-center mb-6 border border-white/20 text-[#F4F5F6] font-mono text-xl font-bold">
                03
              </div>
              <h3 className="text-2xl font-bold text-[#F4F5F6] mb-3">Download to Vault</h3>
              <p className="text-sm text-[#AEB5BB] leading-relaxed">
                Click "Download" (or let the optional 3-second auto-timer handle it). The media is saved directly to your disk with genuine audio tracks and zero compression artifacts.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-[var(--border-glass)] text-xs font-mono text-[#AEB5BB]">
              Saved directly to /vault
            </div>
          </div>
        </div>
      </section>

      {/* 3. CINEMATIC 21:9 WIDE STORYTELLING SECTION */}
      <section className="w-full py-28 px-4 sm:px-8 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-[92vw] max-w-[1440px] flex flex-col lg:flex-row items-center justify-between gap-14"
        >
          <div className="max-w-xl text-left">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D9DDE0] mb-3 block">
              ENGINEERED FOR SPATIAL COMPUTING
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-[#F4F5F6] spatial-section-header tracking-tight mb-6">
              A high-precision system built for humans.
            </h2>
            <p className="text-base sm:text-lg text-[#E2E6E9] spatial-section-desc leading-relaxed mb-8">
              Traditional web downloaders are cluttered with intrusive ads, broken redirects, and low-resolution 360p caps. ZENTHLYR was engineered from the ground up to feel like an authentic spatial operating system: minimal, expansive, mathematically precise, and privacy-first.
            </p>
            
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-sm text-[#F4F5F6]">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Zero advertisements, trackers, popups, or external trackers.</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#F4F5F6]">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>True DASH/HLS split stream muxing via bundled FFMPEG.</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#F4F5F6]">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Spotify track matching with genuine 320kbps MP3 audio output.</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#F4F5F6]">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Instant live playback and previewing inside the spatial vault.</span>
              </div>
            </div>

            <SmoothButton
              variant="candy"
              onClick={() => navigate('/deck')}
              icon={<Play className="w-4 h-4" />}
            >
              Try Downloader Now
            </SmoothButton>
          </div>

          {/* Live Telemetry Card (16:10 ratio) */}
          <div className="w-full lg:w-[48%] aspect-[16/10] vision-card rounded-[38px] p-8 sm:p-10 border border-[var(--border-glass)] shadow-2xl flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-[var(--border-glass)] pb-5">
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-mono font-bold text-[#F4F5F6]">SYSTEM ARCHITECTURE METRICS</span>
              </div>
              <span className="text-xs font-mono text-[#AEB5BB]">Sub-3s Protocol</span>
            </div>

            <div className="space-y-5 my-auto">
              <div>
                <div className="flex justify-between items-center text-xs font-mono mb-2">
                  <span className="text-[#AEB5BB]">Extraction Velocity</span>
                  <span className="font-bold text-[#F4F5F6]">&lt; 2.4s Latency</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#31373D] overflow-hidden">
                  <div className="w-[94%] h-full bg-gradient-to-r from-[#70777E] to-[#F4F5F6] rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-xs font-mono mb-2">
                  <span className="text-[#AEB5BB]">Audio Bitrate Fidelity</span>
                  <span className="font-bold text-[#F4F5F6]">320 kbps Master MP3</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#31373D] overflow-hidden">
                  <div className="w-[98%] h-full bg-gradient-to-r from-[#70777E] to-[#F4F5F6] rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-xs font-mono mb-2">
                  <span className="text-[#AEB5BB]">Video Resolution Ceiling</span>
                  <span className="font-bold text-[#F4F5F6]">4K 2160p Master Quality</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#31373D] overflow-hidden">
                  <div className="w-[100%] h-full bg-gradient-to-r from-[#AEB5BB] to-[#F4F5F6] rounded-full" />
                </div>
              </div>
            </div>

            <div className="text-xs font-mono text-[#AEB5BB] pt-5 border-t border-[var(--border-glass)] flex items-center justify-between">
              <span>CORE // FASTAPI &bull; FFMPEG</span>
              <span className="text-emerald-400">100% OPERATIONAL</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 4. FREQUENTLY ASKED QUESTIONS (ACCESSIBLE TO NORMAL USERS) */}
      <section className="w-full py-28 px-4 sm:px-8 flex flex-col items-center border-t border-[var(--border-glass)] bg-[#31373D]/20">
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-[92vw] max-w-[1440px] text-center mb-16"
        >
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D9DDE0] mb-3 block">
            CLEAR ANSWERS &bull; FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-[#F4F5F6] spatial-section-header tracking-tight mb-4">
            Everything you need to know.
          </h2>
          <p className="text-base sm:text-lg text-[#E2E6E9] spatial-section-desc max-w-xl mx-auto leading-relaxed">
            Common questions answered plainly and simply. No jargon, just clear information on how the system works.
          </p>
        </motion.div>

        <div className="w-[92vw] max-w-4xl space-y-4 text-left">
          {FAQS.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div 
                key={index} 
                className="vision-card rounded-3xl border border-[var(--border-glass)] overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-6 sm:p-7 flex items-center justify-between text-left cursor-pointer hover:bg-white/[0.02] transition-colors"
                >
                  <h3 className="text-base sm:text-lg font-bold text-[#F4F5F6] pr-4">
                    {faq.q}
                  </h3>
                  <ChevronDown className={`w-5 h-5 text-[#AEB5BB] transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180 text-[#F4F5F6]' : ''}`} />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="px-6 sm:px-7 pb-6 sm:pb-7 text-sm text-[#AEB5BB] leading-relaxed border-t border-[var(--border-glass)] pt-4"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. ABOUT, PRIVACY, AND TERMS SPATIAL MODALS & OVERLAYS */}
      <AnimatePresence>
        {legalModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8"
            onClick={() => setLegalModal(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 25 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl vision-window rounded-[36px] p-8 sm:p-12 border border-[var(--specular)] shadow-2xl max-h-[85vh] overflow-y-auto text-left relative"
            >
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-[var(--border-glass)]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full vision-card flex items-center justify-center text-[#F4F5F6]">
                    {legalModal === 'about' && <Sparkles className="w-5 h-5" />}
                    {legalModal === 'privacy' && <ShieldCheck className="w-5 h-5 text-emerald-400" />}
                    {legalModal === 'terms' && <FileText className="w-5 h-5 text-sky-400" />}
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#F4F5F6]">
                      {legalModal === 'about' && 'About ZENTHLYR'}
                      {legalModal === 'privacy' && 'Privacy Policy'}
                      {legalModal === 'terms' && 'Terms & Conditions'}
                    </h3>
                    <span className="text-xs font-mono text-[#AEB5BB]">ZENTHLYR Architectural Disclosure</span>
                  </div>
                </div>
                <button
                  onClick={() => setLegalModal(null)}
                  className="px-4 py-1.5 rounded-full vision-card text-xs font-semibold text-[#AEB5BB] hover:text-[#F4F5F6] border border-[var(--border-glass)] cursor-pointer"
                >
                  Close
                </button>
              </div>

              {/* Modal Content Sections */}
              <div className="space-y-6 text-sm text-[#D9DDE0] leading-relaxed">
                {legalModal === 'about' && (
                  <>
                    <p>
                      <strong>ZENTHLYR</strong> was conceived to solve a universal annoyance: the broken, ad-ridden, low-quality state of modern media downloading. Traditional downloaders bombard users with popups, malware risks, and degraded 360p video files.
                    </p>
                    <p>
                      We built ZENTHLYR with an Apple Vision Pro spatial aesthetic—monochromatic light steel glass, floating depth, and genuine sub-3-second serverless execution. By bundling a zero-install FFMPEG engine directly into the core, ZENTHLYR downloads split 4K video streams and audio simultaneously, assembling genuine master files right on your machine.
                    </p>
                    <div className="vision-card rounded-2xl p-5 border border-[var(--border-glass)] space-y-2">
                      <div className="font-bold text-[#F4F5F6]">Architecture Highlights:</div>
                      <ul className="list-disc pl-5 space-y-1 text-xs text-[#AEB5BB]">
                        <li>Dual-Layer: Python FastAPI extraction core + React Vite spatial interface.</li>
                        <li>Bundled zero-install FFMPEG v9.0.2 binary for native split stream muxing.</li>
                        <li>Direct vault writing: no third-party cloud storage or telemetry tracking.</li>
                      </ul>
                    </div>
                  </>
                )}

                {legalModal === 'privacy' && (
                  <>
                    <p>
                      <strong>Your privacy is an absolute guarantee, not an afterthought.</strong>
                    </p>
                    <p>
                      <strong>1. No Accounts or Tracking:</strong> ZENTHLYR does not require an account, email address, or phone number. We do not use advertising trackers, analytical cookies, or third-party behavioral pixels.
                    </p>
                    <p>
                      <strong>2. Local Device Processing:</strong> Downloaded media files are saved directly to your local computer's storage vault (<code>P:\Downlayer\vault</code>). We never upload your downloaded videos, audios, or photos to any external cloud server.
                    </p>
                    <p>
                      <strong>3. URL Confidentiality:</strong> When you paste a URL for extraction, it is processed strictly to retrieve media stream manifests from the source platform and deliver them directly to your disk. No history of what you download is sold or shared.
                    </p>
                  </>
                )}

                {legalModal === 'terms' && (
                  <>
                    <p>
                      <strong>By using ZENTHLYR, you agree to the following ethical usage terms:</strong>
                    </p>
                    <p>
                      <strong>1. Personal Archival & Fair Use:</strong> ZENTHLYR is designed for personal archival, offline viewing, content verification, and fair use research. You are responsible for ensuring that your downloads respect copyright laws and the intellectual property rights of content creators.
                    </p>
                    <p>
                      <strong>2. No Commercial Redistribution:</strong> You may not use ZENTHLYR to rip and resell copyrighted material or distribute unauthorized copies for commercial profit.
                    </p>
                    <p>
                      <strong>3. As-Is Operation:</strong> The software is provided as-is without warranties. Extraction depends on public stream availability from third-party media platforms.
                    </p>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 6. FULL-WIDTH SPATIAL SYSTEM FOOTER */}
      <footer className="w-[92vw] max-w-[1440px] py-16 border-t border-[var(--border-glass)] flex flex-col md:flex-row items-center justify-between text-xs text-[#AEB5BB] gap-8 mb-24">
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="w-8 h-8 rounded-full vision-card flex items-center justify-center border border-white/20 text-[#F4F5F6] font-mono font-bold">
            Z
          </div>
          <div>
            <div className="font-mono font-bold text-[#F4F5F6] text-sm">ZENTHLYR</div>
            <span>Spatial Media Extraction Architecture &bull; System 2.0</span>
          </div>
        </div>

        {/* Clear Navigation to Plain-English Policy Overlays */}
        <div className="flex flex-wrap items-center justify-center gap-6 font-medium">
          <button 
            onClick={() => setLegalModal('about')} 
            className="hover:text-[#F4F5F6] transition-colors cursor-pointer"
          >
            About System
          </button>
          <button 
            onClick={() => setLegalModal('privacy')} 
            className="hover:text-[#F4F5F6] transition-colors cursor-pointer"
          >
            Privacy Policy
          </button>
          <button 
            onClick={() => setLegalModal('terms')} 
            className="hover:text-[#F4F5F6] transition-colors cursor-pointer"
          >
            Terms & Conditions
          </button>
          <button 
            onClick={() => navigate('/platforms')} 
            className="hover:text-[#F4F5F6] transition-colors cursor-pointer"
          >
            Supported Platforms
          </button>
          <button 
            onClick={() => navigate('/settings')} 
            className="hover:text-[#F4F5F6] transition-colors cursor-pointer"
          >
            System Settings
          </button>
        </div>

        <div className="text-[11px] font-mono text-[#70777E]">
          &copy; 2026 ZENTHLYR &bull; Monochromatic Light Steel
        </div>
      </footer>
    </div>
  );
}
