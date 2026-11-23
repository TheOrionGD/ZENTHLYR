import React from 'react';
import { 
  User as UserIcon, 
  ShieldCheck, 
  DownloadCloud, 
  Award, 
  Sparkles,
  Zap,
  FolderDown
} from 'lucide-react';
import { SpatialWindow, VisionButton } from '../components/SpatialUI';
import { useApp } from '../context/AppContext';

export default function ProfilePage() {
  const { history } = useApp();

  return (
    <div className="min-h-screen p-4 sm:p-8 flex flex-col items-center justify-start pb-32">
      <SpatialWindow
        title="Spatial Profile Deck"
        subtitle="User identity, media consumption statistics, and device quotas"
      >
        <div className="space-y-6">
          {/* Identity Card */}
          <div className="vision-card rounded-3xl p-6 border border-[var(--border-glass)] flex flex-col sm:flex-row items-center gap-6">
            <div className="relative w-20 h-20 rounded-full vision-card border-2 border-[var(--specular)] flex items-center justify-center shadow-xl">
              <UserIcon className="w-10 h-10 text-[var(--text-primary)]" />
              <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-emerald-400 border-2 border-[var(--bg-spatial)]" />
            </div>

            <div className="text-center sm:text-left flex-1">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <h3 className="text-xl font-bold text-[var(--text-primary)]">
                  Guest Spatial Operator
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--text-primary)] text-[var(--bg-spatial)] font-bold">
                  PRO CORE
                </span>
              </div>
              <p className="text-xs text-[var(--text-muted)]">
                Node ID: #ZNT-8942-OS &bull; Local Storage Session
              </p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="vision-card rounded-2xl p-4 border border-[var(--border-glass)] text-center">
              <DownloadCloud className="w-5 h-5 text-[var(--text-primary)] mx-auto mb-2 opacity-80" />
              <div className="text-2xl font-black text-[var(--text-primary)] font-mono">
                {history.length}
              </div>
              <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase">
                Downloads Completed
              </span>
            </div>

            <div className="vision-card rounded-2xl p-4 border border-[var(--border-glass)] text-center">
              <Zap className="w-5 h-5 text-[var(--text-primary)] mx-auto mb-2 opacity-80" />
              <div className="text-2xl font-black text-[var(--text-primary)] font-mono">
                &lt; 2.1s
              </div>
              <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase">
                Average Extraction
              </span>
            </div>

            <div className="vision-card rounded-2xl p-4 border border-[var(--border-glass)] text-center col-span-2 sm:col-span-1">
              <Award className="w-5 h-5 text-[var(--text-primary)] mx-auto mb-2 opacity-80" />
              <div className="text-2xl font-black text-[var(--text-primary)] font-mono">
                100%
              </div>
              <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase">
                Lossless Fidelity
              </span>
            </div>
          </div>

          {/* Features Granted */}
          <div className="vision-card rounded-2xl p-5 border border-[var(--border-glass)]">
            <h4 className="text-xs font-mono font-bold tracking-wider uppercase text-[var(--text-muted)] mb-3">
              Included Spatial Capabilities
            </h4>
            <div className="space-y-2 text-xs text-[var(--text-primary)]">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--text-primary)]" />
                <span>Unlimited 4K and 1080p stream downloads without throttle</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--text-primary)]" />
                <span>Lossless 320kbps MP3 audio stem separation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--text-primary)]" />
                <span>No watermark injection or third-party advertisements</span>
              </div>
            </div>
          </div>
        </div>
      </SpatialWindow>
    </div>
  );
}
