import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FolderDown, 
  Play, 
  Music, 
  Image as ImageIcon, 
  RefreshCw, 
  Eye
} from 'lucide-react';
import { SpatialWindow } from '../../components/SpatialUI';
import SmoothButton from '../../components/SmoothButton';
import { SmoothTabs, SmoothBadge } from '../../components/SmoothUIPrimitives';

export default function DownloadsVaultPage() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeMedia, setActiveMedia] = useState(null);
  const [filterType, setFilterType] = useState('all');

  const fetchDownloadedAssets = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/downloads-list');
      const data = await res.json();
      setAssets(data.files || []);
    } catch {
      // Backend connectivity fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDownloadedAssets();
  }, []);

  const formatSize = (bytes) => {
    if (!bytes || bytes <= 0) return '0 B';
    const units = ['B', 'KB', 'MB', 'GB'];
    let i = 0;
    while (bytes >= 1024 && i < units.length - 1) {
      bytes /= 1024;
      i++;
    }
    return `${bytes.toFixed(1)} ${units[i]}`;
  };

  const filteredAssets = assets.filter(item => {
    if (filterType === 'all') return true;
    return item.type === filterType;
  });

  return (
    <div className="w-full flex flex-col items-center justify-start pb-24">
      <SpatialWindow
        title="Downloaded Assets Vault"
        subtitle="Live spatial preview for all media downloaded directly to the root /downloads folder"
      >
        {/* Controls Bar with SmoothTabs */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[var(--border-glass)]">
          <SmoothTabs
            tabs={[
              { id: 'all', label: 'All', count: assets.length },
              { id: 'video', label: 'Videos', count: assets.filter(a => a.type === 'video').length },
              { id: 'audio', label: 'Audios', count: assets.filter(a => a.type === 'audio').length },
              { id: 'image', label: 'Images', count: assets.filter(a => a.type === 'image').length },
            ]}
            activeTab={filterType}
            onChange={setFilterType}
          />

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-[11px] font-mono text-[var(--text-muted)]">
              Path: <strong className="text-[var(--text-primary)]">P:\Downlayer\vault</strong>
            </span>
            <SmoothButton
              variant="ghost"
              size="xs"
              onClick={fetchDownloadedAssets}
              icon={<RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />}
            >
              Refresh
            </SmoothButton>
          </div>
        </div>

        {/* Media Preview Modal / Spatial Cinema Screen */}
        <AnimatePresence>
          {activeMedia && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="vision-card rounded-3xl p-5 mb-6 border border-[var(--specular)] shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--text-primary)] text-[var(--bg-spatial)]">
                    {activeMedia.ext.toUpperCase()}
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-[var(--text-primary)] truncate max-w-xs sm:max-w-md">
                    {activeMedia.name}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveMedia(null)}
                  className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[var(--card-glass)] text-[var(--text-muted)] hover:text-[var(--text-primary)] border border-[var(--border-glass)]"
                >
                  Close
                </button>
              </div>

              {/* Dynamic Player according to type */}
              <div className="rounded-2xl overflow-hidden bg-black/40 border border-[var(--border-glass)] flex items-center justify-center p-2">
                {activeMedia.type === 'video' && (
                  <video
                    src={activeMedia.preview_url}
                    controls
                    autoPlay
                    className="w-full max-h-[360px] rounded-xl object-contain"
                  />
                )}

                {activeMedia.type === 'audio' && (
                  <div className="w-full py-8 flex flex-col items-center justify-center">
                    <div className="w-16 h-16 rounded-full vision-card flex items-center justify-center mb-4 border border-[var(--specular)] shadow-xl animate-pulse">
                      <Music className="w-7 h-7 text-[var(--text-primary)]" />
                    </div>
                    <audio
                      src={activeMedia.preview_url}
                      controls
                      autoPlay
                      className="w-full max-w-md"
                    />
                  </div>
                )}

                {activeMedia.type === 'image' && (
                  <img
                    src={activeMedia.preview_url}
                    alt={activeMedia.name}
                    className="max-h-[380px] rounded-xl object-contain"
                  />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 2-Column Grid (decreased horizontal breadth, increased vertical stacking) */}
        {filteredAssets.length === 0 ? (
          <div className="text-center py-16">
            <FolderDown className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-3 opacity-30" />
            <h3 className="text-base font-bold text-[var(--text-primary)] mb-1">
              No Downloaded Assets Found
            </h3>
            <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto">
              Extract and download any media link on the Main Deck to automatically populate this portal vault.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {filteredAssets.map((asset, index) => {
              const isVid = asset.type === 'video';
              const isAud = asset.type === 'audio';
              const isImg = asset.type === 'image';

              return (
                <div
                  key={index}
                  className="vision-card rounded-2xl p-4 border border-[var(--border-glass)] flex flex-col justify-between hover:border-[var(--text-primary)]/40 transition-all"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-9 h-9 rounded-xl vision-card flex items-center justify-center flex-shrink-0 text-[var(--text-primary)] border border-[var(--border-glass)]">
                      {isVid && <Play className="w-4 h-4" />}
                      {isAud && <Music className="w-4 h-4" />}
                      {isImg && <ImageIcon className="w-4 h-4" />}
                    </div>

                    <div className="flex-1 overflow-hidden">
                      <h4 className="text-xs sm:text-sm font-bold text-[var(--text-primary)] truncate" title={asset.name}>
                        {asset.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-[var(--window-glass)] border border-[var(--border-glass)] text-[var(--text-muted)]">
                          {asset.ext}
                        </span>
                        <span className="text-[10px] font-mono text-[var(--text-muted)]">
                          {formatSize(asset.size_bytes)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2.5 border-t border-[var(--border-glass)]">
                    <span className="text-[10px] font-mono text-[var(--text-muted)]">
                      Saved in /downloads
                    </span>

                    <SmoothButton
                      variant="candy"
                      size="xs"
                      onClick={() => setActiveMedia(asset)}
                      icon={<Eye className="w-3.5 h-3.5" />}
                    >
                      Preview
                    </SmoothButton>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </SpatialWindow>
    </div>
  );
}
