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
  CheckCircle
} from 'lucide-react';
import { SpatialWindow, VisionButton } from '../components/SpatialUI';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-4 sm:p-8 flex flex-col items-center justify-center pb-28">
      <SpatialWindow className="max-w-4xl py-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full vision-card border border-[var(--border-glass)] mb-6 text-xs font-mono text-[var(--text-muted)]">
            <Sparkles className="w-3.5 h-3.5 text-[var(--text-primary)]" />
            <span>Spatial Media Architecture</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-[var(--text-primary)] leading-tight mb-4">
            High Fidelity Downloader for the Spatial Era.
          </h1>

          <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed mb-8">
            Effortlessly capture videos, audios, stories, and original photography from any social platform with zero ads and zero quality loss.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <VisionButton
              variant="primary"
              onClick={() => navigate('/deck')}
              icon={<DownloadCloud className="w-5 h-5" />}
              className="px-8 py-3.5 text-base"
            >
              Open Downloader Deck
            </VisionButton>

            <VisionButton
              variant="default"
              onClick={() => navigate('/platforms')}
              icon={<Layers className="w-5 h-5" />}
              className="px-6 py-3.5 text-base"
            >
              Explore Supported Platforms
            </VisionButton>
          </div>
        </div>

        {/* Spatial Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="vision-card rounded-2xl p-6 border border-[var(--border-glass)]">
            <Zap className="w-6 h-6 text-[var(--text-primary)] mb-3" />
            <h3 className="text-base font-bold text-[var(--text-primary)] mb-1">Sub-3s Processing</h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Proprietary extraction pipelines analyze URLs instantly without server queues.
            </p>
          </div>

          <div className="vision-card rounded-2xl p-6 border border-[var(--border-glass)]">
            <CheckCircle className="w-6 h-6 text-[var(--text-primary)] mb-3" />
            <h3 className="text-base font-bold text-[var(--text-primary)] mb-1">True Master Quality</h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Download native 4K 60fps streams, 320kbps MP3 audio, and lossless JPEG/PNG photos.
            </p>
          </div>

          <div className="vision-card rounded-2xl p-6 border border-[var(--border-glass)]">
            <ShieldCheck className="w-6 h-6 text-[var(--text-primary)] mb-3" />
            <h3 className="text-base font-bold text-[var(--text-primary)] mb-1">100% Free & Private</h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              No tracking, no account requirements, and no deceptive watermarks.
            </p>
          </div>
        </div>

        {/* Footer Meta Link Inside Spatial Window */}
        <div className="flex items-center justify-between text-xs text-[var(--text-muted)] pt-6 border-t border-[var(--border-glass)]">
          <span>ZENTHLYR &copy; 2026</span>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/terms')} className="hover:text-[var(--text-primary)]">
              Terms
            </button>
            <button onClick={() => navigate('/privacy')} className="hover:text-[var(--text-primary)]">
              Privacy
            </button>
          </div>
        </div>
      </SpatialWindow>
    </div>
  );
}
