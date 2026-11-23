import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Sun, 
  Moon, 
  Database, 
  Activity, 
  Info,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { SpatialWindow, VisionButton } from '../../components/SpatialUI';
import { useApp } from '../../context/AppContext';

export default function SettingsPage() {
  const { theme, toggleTheme, clearHistory } = useApp();
  const [cacheCleared, setCacheCleared] = useState(false);
  const [engineStatus, setEngineStatus] = useState({ state: 'Online', latency: '24ms' });

  const handleClearCache = () => {
    localStorage.removeItem('zenthlyr_history');
    clearHistory();
    setCacheCleared(true);
    setTimeout(() => setCacheCleared(false), 2500);
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 flex flex-col items-center justify-start pb-32">
      <SpatialWindow
        title="System Settings"
        subtitle="Spatial UI runtime diagnostics, theme palette, and local memory controls"
      >
        <div className="space-y-6">
          {/* Light Steel Color Palette Info Card */}
          <div className="vision-card rounded-2xl p-5 border border-[var(--border-glass)]">
            <h3 className="text-sm font-bold text-[var(--text-primary)] mb-2">
              Color Palette: Light Steel
            </h3>
            <p className="text-xs text-[var(--text-muted)] mb-4">
              Balanced grays, off-whites, and cool charcoals offering minimalism, clarity, and subtle polish.
            </p>

            <div className="grid grid-cols-5 sm:grid-cols-9 gap-2">
              {[
                { name: 'Snow', hex: '#f8f9fa' },
                { name: 'Platinum', hex: '#e9ecef' },
                { name: 'Alabaster', hex: '#dee2e6' },
                { name: 'Pale 1', hex: '#ced4da' },
                { name: 'Pale 2', hex: '#adb5bd' },
                { name: 'Slate', hex: '#6c757d' },
                { name: 'Iron', hex: '#495057' },
                { name: 'Gunmetal', hex: '#343a40' },
                { name: 'Shadow', hex: '#212529' }
              ].map((c) => (
                <div key={c.hex} className="flex flex-col items-center">
                  <div 
                    className="w-8 h-8 rounded-full border border-black/10 shadow-sm"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span className="text-[10px] font-mono mt-1 text-[var(--text-muted)]">{c.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Theme Mode Toggle */}
          <div className="vision-card rounded-2xl p-5 border border-[var(--border-glass)] flex items-center justify-between">
            <div className="flex items-center gap-3">
              {theme === 'dark' ? (
                <Moon className="w-5 h-5 text-[var(--text-primary)]" />
              ) : (
                <Sun className="w-5 h-5 text-[var(--text-primary)]" />
              )}
              <div>
                <h3 className="text-sm font-bold text-[var(--text-primary)]">
                  Appearance Theme
                </h3>
                <p className="text-xs text-[var(--text-muted)]">
                  Currently active: <strong className="capitalize">{theme} Steel Mode</strong>
                </p>
              </div>
            </div>

            <VisionButton
              variant="default"
              onClick={toggleTheme}
              className="text-xs font-semibold"
            >
              Toggle to {theme === 'dark' ? 'Light' : 'Dark'}
            </VisionButton>
          </div>

          {/* Backend Diagnostics */}
          <div className="vision-card rounded-2xl p-5 border border-[var(--border-glass)] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Activity className="w-5 h-5 text-emerald-400" />
              <div>
                <h3 className="text-sm font-bold text-[var(--text-primary)]">
                  Python Extraction Core
                </h3>
                <p className="text-xs text-[var(--text-muted)]">
                  FastAPI Engine &bull; Latency: {engineStatus.latency} &bull; Status: {engineStatus.state}
                </p>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              OPERATIONAL
            </span>
          </div>

          {/* Local Storage Flush */}
          <div className="vision-card rounded-2xl p-5 border border-[var(--border-glass)] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Database className="w-5 h-5 text-[var(--text-primary)]" />
              <div>
                <h3 className="text-sm font-bold text-[var(--text-primary)]">
                  Clear Spatial Cache
                </h3>
                <p className="text-xs text-[var(--text-muted)]">
                  Erase local URL history and temporary download metadata.
                </p>
              </div>
            </div>

            <VisionButton
              variant="accent"
              onClick={handleClearCache}
              className="text-xs"
            >
              {cacheCleared ? 'Cleared!' : 'Flush Memory'}
            </VisionButton>
          </div>

          {/* Version Pill */}
          <div className="text-center pt-2">
            <span className="text-[11px] font-mono text-[var(--text-muted)]">
              ZENTHLYR &bull; Build 2.0.4-spatial &bull; Spatial UI Spec
            </span>
          </div>
        </div>
      </SpatialWindow>
    </div>
  );
}
