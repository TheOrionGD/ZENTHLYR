import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DownloadCloud, 
  Link as LinkIcon, 
  Sparkles, 
  Check, 
  AlertCircle, 
  Loader2, 
  Play, 
  Music, 
  Image as ImageIcon,
  Copy,
  Clock,
  Layers,
  ArrowDownCircle,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SpatialWindow } from '../../components/SpatialUI';
import SmoothButton from '../../components/SmoothButton';
import { SmoothText, SmoothBadge, SmoothAlert } from '../../components/SmoothUIPrimitives';
import { useApp } from '../../context/AppContext';

export default function HomePage() {
  const [urlInput, setUrlInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [autoCountdown, setAutoCountdown] = useState(null);
  const { addToHistory, preferences, currentMedia, setCurrentMedia } = useApp();

  const handlePasteClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text && text.trim().startsWith('http')) {
        setUrlInput(text.trim());
        triggerAnalyze(text.trim());
      }
    } catch {
      // Browser permissions fallback
    }
  };

  const triggerAnalyze = async (targetUrl = urlInput) => {
    if (!targetUrl || !targetUrl.trim()) return;
    setLoading(true);
    setError(null);
    setCurrentMedia(null);
    setAutoCountdown(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: targetUrl.trim() })
      });

      const data = await response.json();
      if (!response.ok || data.status === 'error') {
        throw new Error(data.message || 'Media extraction failed on this platform URL.');
      }

      setCurrentMedia(data);
      addToHistory(data);

      // Handle 3-second Auto-Download if enabled in preferences
      if (preferences.autoDownloadEnabled && data.formats && data.formats.length > 0) {
        const bestFormat = data.formats.find(f => f.recommended) || data.formats[0];
        let remaining = preferences.autoDownloadSeconds || 3;
        setAutoCountdown(remaining);

        const countdownInterval = setInterval(() => {
          remaining -= 1;
          if (remaining > 0) {
            setAutoCountdown(remaining);
          } else {
            clearInterval(countdownInterval);
            setAutoCountdown(null);
            handleDownloadFormat(bestFormat, data.title);
          }
        }, 1000);
      }
    } catch (err) {
      setError(err.message || 'Unable to connect to extraction core. Please check network.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadFormat = (fmt, title) => {
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#ced4da', '#6c757d', '#adb5bd', '#f8f9fa']
    });

    const safeTitle = (title || 'zenthlyr_media').replace(/[^a-zA-Z0-9_\-]/g, '_').slice(0, 40);
    const downloadFilename = `${safeTitle}.${fmt.ext}`;

    // Pass the format target url, filename, AND original webpage url so backend can mux with FFMPEG
    const downloadEndpoint = `/api/download?url=${encodeURIComponent(fmt.url)}&filename=${encodeURIComponent(downloadFilename)}&source_url=${encodeURIComponent(currentMedia.url)}&format_id=${encodeURIComponent(fmt.id || '')}`;
    
    // Create direct anchor trigger
    const link = document.createElement('a');
    link.href = downloadEndpoint;
    link.setAttribute('download', downloadFilename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 flex flex-col items-center justify-start pb-32">
      <SpatialWindow 
        title="Universal Extraction Deck" 
        subtitle="Paste any link from Instagram, TikTok, YouTube, X, Pinterest, Spotify, Reddit..."
      >
        {/* Spatial Input Bar */}
        <div className="relative mb-6">
          <div className="flex items-center gap-2 p-2 sm:p-3 rounded-full vision-card border border-[var(--border-glass)] shadow-lg focus-within:border-[var(--text-primary)] transition-all">
            <div className="pl-3 text-[var(--text-muted)]">
              <LinkIcon className="w-5 h-5" />
            </div>

            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && triggerAnalyze()}
              placeholder="Paste social media or stream URL here..."
              className="w-full bg-transparent border-none outline-none text-sm sm:text-base font-medium text-[var(--text-primary)] placeholder-[var(--text-muted)] px-2"
            />

            <button
              onClick={handlePasteClipboard}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--card-glass)] transition-all"
              title="Paste from clipboard"
            >
              <Copy className="w-3.5 h-3.5" />
              Paste
            </button>

            <SmoothButton
              variant="candy"
              size="default"
              onClick={() => triggerAnalyze()}
              disabled={loading || !urlInput.trim()}
              className="py-2.5 px-6 font-bold"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                'Extract'
              )}
            </SmoothButton>
          </div>
        </div>

        {/* Error Notification with SmoothAlert */}
        <AnimatePresence>
          {error && (
            <div className="mb-6">
              <SmoothAlert
                variant="destructive"
                title="Extraction Interrupted"
                description={error}
                onClose={() => setError(null)}
              />
            </div>
          )}
        </AnimatePresence>

        {/* Auto Download Countdown Pill */}
        {autoCountdown !== null && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center justify-between p-3.5 mb-6 rounded-2xl vision-card border border-[var(--specular)] shadow-xl"
          >
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-[var(--text-primary)] animate-spin" />
              <span className="text-xs sm:text-sm font-medium text-[var(--text-primary)]">
                Auto-downloading best master quality in <strong className="font-mono text-base">{autoCountdown}s</strong>...
              </span>
            </div>
            <button
              onClick={() => setAutoCountdown(null)}
              className="text-xs font-semibold px-3 py-1 rounded-full bg-[var(--card-glass)] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            >
              Cancel Auto-Timer
            </button>
          </motion.div>
        )}

        {/* Media Results Deck */}
        {currentMedia && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="vision-card rounded-3xl p-5 sm:p-7 border border-[var(--border-glass)] shadow-2xl"
          >
            <div className="flex flex-col md:flex-row gap-6 mb-6 pb-6 border-b border-[var(--border-glass)]">
              {/* Media Thumbnail */}
              {currentMedia.thumbnail ? (
                <div className="relative w-full md:w-56 h-48 md:h-36 rounded-2xl overflow-hidden flex-shrink-0 vision-card border border-[var(--border-glass)]">
                  <img
                    src={currentMedia.thumbnail}
                    alt={currentMedia.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-black/60 backdrop-blur-md text-white border border-white/20">
                    {currentMedia.platform.name}
                  </div>
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-mono bg-black/70 backdrop-blur-md text-white">
                    {currentMedia.duration}
                  </div>
                </div>
              ) : null}

              {/* Title & Metadata */}
              <div className="flex-1 flex flex-col justify-center">
                <span className="text-xs font-mono text-[var(--text-muted)] mb-1">
                  Author: <strong className="text-[var(--text-primary)]">{currentMedia.author}</strong>
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] line-clamp-2 mb-3">
                  {currentMedia.title}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-[var(--card-glass)] border border-[var(--border-glass)] text-[var(--text-muted)]">
                    {currentMedia.formats?.length || 0} Available Formats
                  </span>
                  <a
                    href={currentMedia.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  >
                    Original Link <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Quality & Format Matrix */}
            <div>
              <h4 className="text-xs font-mono font-bold tracking-wider uppercase text-[var(--text-muted)] mb-4">
                Available Master Streams & Downloads
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {currentMedia.formats?.map((fmt, idx) => {
                  const isVid = fmt.type === 'video';
                  const isAud = fmt.type === 'audio';
                  return (
                    <div
                      key={idx}
                      className={`vision-card rounded-2xl p-4 border flex flex-col justify-between transition-all ${
                        fmt.recommended 
                          ? 'border-[var(--text-primary)] shadow-md shadow-black/10' 
                          : 'border-[var(--border-glass)]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full vision-card flex items-center justify-center text-[var(--text-primary)]">
                            {isVid ? <Play className="w-4 h-4" /> : isAud ? <Music className="w-4 h-4" /> : <ImageIcon className="w-4 h-4" />}
                          </div>
                          <div>
                            <span className="text-xs font-bold text-[var(--text-primary)] block">
                              {fmt.label}
                            </span>
                            <span className="text-[10px] font-mono text-[var(--text-muted)]">
                              {fmt.resolution} &bull; {fmt.ext.toUpperCase()}
                            </span>
                          </div>
                        </div>

                        {fmt.recommended && (
                          <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--text-primary)] text-[var(--bg-spatial)]">
                            Best
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-[var(--border-glass)]">
                        <span className="text-xs font-mono text-[var(--text-muted)]">
                          {fmt.filesize}
                        </span>

                        <SmoothButton
                          variant={fmt.recommended ? 'candy' : 'soft'}
                          size="sm"
                          onClick={() => handleDownloadFormat(fmt, currentMedia.title)}
                          icon={<ArrowDownCircle className="w-4 h-4" />}
                          className="py-1.5 px-3.5 text-xs font-semibold"
                        >
                          Download
                        </SmoothButton>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </SpatialWindow>
    </div>
  );
}
