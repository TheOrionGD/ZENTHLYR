import React from 'react';
import { 
  Sliders, 
  Zap, 
  Video, 
  Volume2, 
  Clipboard, 
  Sparkles,
  ShieldAlert 
} from 'lucide-react';
import { SpatialWindow } from '../../components/SpatialUI';
import { useApp } from '../../context/AppContext';

export default function PreferencesPage() {
  const { preferences, updatePreferences } = useApp();

  return (
    <div className="min-h-screen p-4 sm:p-8 flex flex-col items-center justify-start pb-32">
      <SpatialWindow
        title="Extraction Preferences"
        subtitle="Configure auto-download behavior, quality profiles, and spatial interactions"
      >
        <div className="space-y-6">
          {/* 3-Second Auto Download Toggle */}
          <div className="vision-card rounded-2xl p-5 border border-[var(--border-glass)] flex items-center justify-between">
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-[var(--text-primary)] mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-[var(--text-primary)]">
                  3-Second Rapid Auto-Download
                </h3>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">
                  Automatically triggers download of the highest available master format after a 3s countdown.
                </p>
              </div>
            </div>

            <input
              type="checkbox"
              checked={preferences.autoDownloadEnabled}
              onChange={(e) => updatePreferences({ autoDownloadEnabled: e.target.checked })}
              className="w-5 h-5 accent-[var(--text-primary)] cursor-pointer"
            />
          </div>

          {/* Quality Default Selection */}
          <div className="vision-card rounded-2xl p-5 border border-[var(--border-glass)]">
            <div className="flex items-center gap-3 mb-3">
              <Video className="w-5 h-5 text-[var(--text-primary)]" />
              <div>
                <h3 className="text-sm font-bold text-[var(--text-primary)]">
                  Preferred Resolution Priority
                </h3>
                <p className="text-xs text-[var(--text-muted)]">
                  Specify default target stream when multiple resolutions are detected.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
              {[
                { id: 'highest', label: 'Best Available (4K/1080p)' },
                { id: '1080p', label: 'Full HD (1080p)' },
                { id: '720p', label: 'Standard (720p)' },
                { id: 'audio_only', label: 'Audio Master Only' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => updatePreferences({ defaultQuality: opt.id })}
                  className={`p-3 rounded-xl text-xs font-semibold border text-center transition-all ${
                    preferences.defaultQuality === opt.id
                      ? 'bg-[var(--text-primary)] text-[var(--bg-spatial)] border-[var(--text-primary)] shadow-md'
                      : 'vision-card border-[var(--border-glass)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Clipboard Auto Detection */}
          <div className="vision-card rounded-2xl p-5 border border-[var(--border-glass)] flex items-center justify-between">
            <div className="flex items-start gap-3">
              <Clipboard className="w-5 h-5 text-[var(--text-primary)] mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-[var(--text-primary)]">
                  Clipboard Auto-Detection
                </h3>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">
                  Allows 1-click clipboard paste recognition when focusing input deck.
                </p>
              </div>
            </div>

            <input
              type="checkbox"
              checked={preferences.autoClipboardDetect}
              onChange={(e) => updatePreferences({ autoClipboardDetect: e.target.checked })}
              className="w-5 h-5 accent-[var(--text-primary)] cursor-pointer"
            />
          </div>

          {/* Spatial Sound Effects */}
          <div className="vision-card rounded-2xl p-5 border border-[var(--border-glass)] flex items-center justify-between">
            <div className="flex items-start gap-3">
              <Volume2 className="w-5 h-5 text-[var(--text-primary)] mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-[var(--text-primary)]">
                  Spatial Audio & Haptic Feedback
                </h3>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">
                  Celebration confetti and interactive acoustic chimes upon download completion.
                </p>
              </div>
            </div>

            <input
              type="checkbox"
              checked={preferences.spatialSoundEffects}
              onChange={(e) => updatePreferences({ spatialSoundEffects: e.target.checked })}
              className="w-5 h-5 accent-[var(--text-primary)] cursor-pointer"
            />
          </div>
        </div>
      </SpatialWindow>
    </div>
  );
}
