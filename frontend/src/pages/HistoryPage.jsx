import React from 'react';
import { motion } from 'framer-motion';
import { 
  History as HistoryIcon, 
  Trash2, 
  ExternalLink, 
  ArrowDownCircle, 
  Clock, 
  Check, 
  Layers 
} from 'lucide-react';
import { SpatialWindow, VisionButton } from '../components/SpatialUI';
import { useApp } from '../context/AppContext';

export default function HistoryPage() {
  const { history, removeFromHistory, clearHistory, setCurrentMedia } = useApp();

  return (
    <div className="min-h-screen p-4 sm:p-8 flex flex-col items-center justify-start pb-32">
      <SpatialWindow
        title="Extraction History Vault"
        subtitle="Manage and re-download your previously extracted media"
      >
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--border-glass)]">
          <span className="text-xs font-mono text-[var(--text-muted)]">
            Total Captured Items: <strong className="text-[var(--text-primary)]">{history.length}</strong>
          </span>

          {history.length > 0 && (
            <VisionButton
              variant="ghost"
              onClick={clearHistory}
              icon={<Trash2 className="w-3.5 h-3.5" />}
              className="text-xs text-red-400 hover:text-red-300"
            >
              Clear Vault
            </VisionButton>
          )}
        </div>

        {history.length === 0 ? (
          <div className="text-center py-16">
            <HistoryIcon className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-4 opacity-40" />
            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1">
              Vault is Empty
            </h3>
            <p className="text-xs text-[var(--text-muted)] max-w-xs mx-auto">
              Any URLs you extract on the main deck will automatically appear here for rapid re-download.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {history.map((item) => (
              <div
                key={item.id}
                className="vision-card rounded-2xl p-4 border border-[var(--border-glass)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  {item.thumbnail ? (
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-14 h-14 rounded-xl object-cover flex-shrink-0 border border-[var(--border-glass)]"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-xl vision-card flex items-center justify-center flex-shrink-0 text-[var(--text-muted)]">
                      <Layers className="w-6 h-6" />
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[var(--window-glass)] border border-[var(--border-glass)] text-[var(--text-muted)]">
                        {item.platform?.name || 'Media'}
                      </span>
                      <span className="text-[10px] font-mono text-[var(--text-muted)] flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-[var(--text-primary)] line-clamp-1 max-w-md">
                      {item.title}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-full vision-btn text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                    title="Open Source Link"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => removeFromHistory(item.id)}
                    className="p-2 rounded-full vision-btn text-red-400 hover:text-red-300"
                    title="Delete item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </SpatialWindow>
    </div>
  );
}
