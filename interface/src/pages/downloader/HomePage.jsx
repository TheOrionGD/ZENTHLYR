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
  ExternalLink,
  Zap,
  Activity,
  Cpu
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SpatialWindow } from '../../components/SpatialUI';
import SmoothButton from '../../components/SmoothButton';
import { SmoothText, SmoothBadge, SmoothAlert } from '../../components/SmoothUIPrimitives';
import { useApp } from '../../context/AppContext';
import { getApiUrl } from '../../utils/api';

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

  const [batchResults, setBatchResults] = useState([]);
  const [activeTab, setActiveTab] = useState('single'); // 'single' | 'batch'

  const handleBatchAnalyze = async () => {
    const rawLines = urlInput.split(/\r?\n/).map(l => l.trim()).filter(l => l.startsWith('http'));
    if (rawLines.length === 0) {
      setError('Please enter at least one valid media URL on a new line.');
      return;
    }

    setLoading(true);
    setError(null);
    setBatchResults([]);

    try {
      const response = await fetch(getApiUrl('/api/batch-analyze'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ urls: rawLines })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || 'Batch extraction failed.');
      }

      setBatchResults(data.results || []);
    } catch (err) {
      setError(err.message || 'Unable to complete batch processing.');
    } finally {
      setLoading(false);
    }
  };

  const triggerAnalyze = async (targetUrl = urlInput) => {
    if (activeTab === 'batch') {
      return handleBatchAnalyze();
    }
    if (!targetUrl || !targetUrl.trim()) return;
    setLoading(true);
    setError(null);
    setCurrentMedia(null);
    setAutoCountdown(null);

    try {
      const response = await fetch(getApiUrl('/api/analyze'), {
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
    const downloadEndpoint = getApiUrl(`/api/download?url=${encodeURIComponent(fmt.url)}&filename=${encodeURIComponent(downloadFilename)}&source_url=${encodeURIComponent(currentMedia.url)}&format_id=${encodeURIComponent(fmt.id || '')}`);
    
    // Create direct anchor trigger
    const link = document.createElement('a');
    link.href = downloadEndpoint;
    link.setAttribute('download', downloadFilename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full min-h-screen px-4 sm:px-8 py-8 flex flex-col items-center justify-start pb-36">
      {/* Cinematic Hero Header (Apple Spatial Product Website Layout) */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-[92vw] max-w-[1440px] mb-8 text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full vision-card border border-[var(--border-glass)] text-xs font-mono text-[#AEB5BB] mb-4 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#F4F5F6]" />
          <span>SPATIAL MEDIA INTELLIGENCE &bull; SYSTEM 2.0</span>
        </div>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-[#F4F5F6] mb-3">
          Capture without compromise.
        </h1>
        <p className="text-base sm:text-lg text-[#AEB5BB] max-w-2xl mx-auto leading-relaxed">
          High-performance spatial extraction deck engineered for seamless stream capture across global web protocols.
        </p>
      </motion.div>

      <SpatialWindow 
        title="Universal Extraction Deck" 
        subtitle="Intelligent dual-track stream resolver for Instagram, TikTok, YouTube, X, Pinterest, Spotify, and 1,750+ sources."
      >
        {/* Advanced System Engine Telemetry Bar - Expanded 4-Column Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-8">
          <div className="vision-card rounded-2xl px-5 py-3.5 border border-[var(--border-glass)] flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <div>
              <span className="text-[10px] font-mono text-[#AEB5BB] block uppercase tracking-wider">Engine Core</span>
              <span className="text-sm font-bold text-[#F4F5F6]">Sub-3s Active</span>
            </div>
          </div>

          <div className="vision-card rounded-2xl px-5 py-3.5 border border-[var(--border-glass)] flex items-center gap-3">
            <Zap className="w-4 h-4 text-[#F4F5F6]" />
            <div>
              <span className="text-[10px] font-mono text-[#AEB5BB] block uppercase tracking-wider">Muxer Pipeline</span>
              <span className="text-sm font-bold text-[#F4F5F6]">FFMPEG Dual-Track</span>
            </div>
          </div>

          <div className="vision-card rounded-2xl px-5 py-3.5 border border-[var(--border-glass)] flex items-center gap-3">
            <Layers className="w-4 h-4 text-[#F4F5F6]" />
            <div>
              <span className="text-[10px] font-mono text-[#AEB5BB] block uppercase tracking-wider">Protocols</span>
              <span className="text-sm font-bold text-[#F4F5F6]">1,750+ Platforms</span>
            </div>
          </div>

          <div className="vision-card rounded-2xl px-5 py-3.5 border border-[var(--border-glass)] flex items-center gap-3">
            <Activity className="w-4 h-4 text-[#F4F5F6]" />
            <div>
              <span className="text-[10px] font-mono text-[#AEB5BB] block uppercase tracking-wider">Direct Storage</span>
              <span className="text-sm font-bold text-[#F4F5F6]">Lossless /vault</span>
            </div>
          </div>
        </div>

        {/* Mode Selector Tabs (Single vs Multi-Stream Batch) */}
        <div className="flex items-center justify-between mb-5">
          <div className="inline-flex p-1 rounded-full vision-card border border-[var(--border-glass)]">
            <button
              onClick={() => { setActiveTab('single'); setBatchResults([]); }}
              className={`px-5 py-2 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                activeTab === 'single'
                  ? 'bg-[#F4F5F6] text-[#31373D] font-bold shadow-md'
                  : 'text-[#AEB5BB] hover:text-[#F4F5F6]'
              }`}
            >
              Direct URL
            </button>
            <button
              onClick={() => { setActiveTab('batch'); setCurrentMedia(null); }}
              className={`px-5 py-2 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                activeTab === 'batch'
                  ? 'bg-[#F4F5F6] text-[#31373D] font-bold shadow-md'
                  : 'text-[#AEB5BB] hover:text-[#F4F5F6]'
              }`}
            >
              Batch Queue Mode
            </button>
          </div>

          <span className="text-xs font-mono text-[#AEB5BB] hidden sm:inline">
            {activeTab === 'single' ? 'Single media inspection & stream preview' : 'Concurrent multi-URL parallel resolution'}
          </span>
        </div>

        {/* Wide Spatial Input Bar */}
        <div className="relative mb-8">
          <div className={`flex items-center gap-3 p-3 sm:p-4 rounded-full vision-card border border-[var(--border-glass)] shadow-xl focus-within:border-[#F4F5F6] transition-all ${activeTab === 'batch' ? 'rounded-3xl' : ''}`}>
            <div className="pl-4 text-[#AEB5BB] self-center">
              <LinkIcon className="w-5 h-5" />
            </div>

            {activeTab === 'single' ? (
              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && triggerAnalyze()}
                placeholder="Paste Instagram, YouTube, Spotify, TikTok, X, Pinterest URL..."
                className="w-full bg-transparent border-none outline-none text-base font-medium text-[#F4F5F6] placeholder-[#70777E] px-3"
              />
            ) : (
              <textarea
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                rows={3}
                placeholder="Paste multiple URLs (one per line) to process in parallel..."
                className="w-full bg-transparent border-none outline-none text-sm font-mono text-[#F4F5F6] placeholder-[#70777E] px-3 py-1.5 resize-none"
              />
            )}

            <button
              onClick={handlePasteClipboard}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-[#AEB5BB] hover:text-[#F4F5F6] hover:bg-[var(--card-glass)] transition-all cursor-pointer"
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
              className="py-3 px-8 font-bold flex-shrink-0 text-sm"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                activeTab === 'single' ? 'Extract' : 'Process Batch'
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

        {/* Batch Queue Results Deck */}
        {batchResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="vision-card rounded-3xl p-5 sm:p-7 border border-[var(--border-glass)] shadow-2xl mb-6"
          >
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--border-glass)]">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)]">
                  Batch Extraction Results ({batchResults.length})
                </h3>
                <span className="text-xs font-mono text-[var(--text-muted)]">
                  Simultaneous multi-protocol resolution complete
                </span>
              </div>
              <SmoothButton
                variant="candy"
                size="sm"
                onClick={() => {
                  batchResults.forEach(item => {
                    if (item.status !== 'error' && item.formats?.length > 0) {
                      const best = item.formats.find(f => f.recommended) || item.formats[0];
                      handleDownloadFormat(best, item.title);
                    }
                  });
                }}
                icon={<ArrowDownCircle className="w-4 h-4" />}
              >
                Download All Masters
              </SmoothButton>
            </div>

            <div className="space-y-3">
              {batchResults.map((item, idx) => {
                const isErr = item.status === 'error';
                return (
                  <div
                    key={idx}
                    className="vision-card rounded-2xl p-4 border border-[var(--border-glass)] flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      {item.thumbnail ? (
                        <img src={item.thumbnail} alt="" className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                      ) : (
                        <div className="w-12 h-12 rounded-xl vision-card flex items-center justify-center flex-shrink-0">
                          <Layers className="w-5 h-5 text-[var(--text-muted)]" />
                        </div>
                      )}
                      <div className="overflow-hidden">
                        <h4 className="text-xs sm:text-sm font-bold text-[var(--text-primary)] truncate">
                          {item.title || item.url}
                        </h4>
                        <span className="text-[10px] font-mono text-[var(--text-muted)]">
                          {isErr ? (
                            <span className="text-rose-400">{item.message || 'Resolution failed'}</span>
                          ) : (
                            `${item.platform?.name || 'Media'} • ${item.formats?.length || 0} Streams Ready`
                          )}
                        </span>
                      </div>
                    </div>

                    {!isErr && item.formats?.length > 0 && (
                      <SmoothButton
                        variant="candy"
                        size="xs"
                        onClick={() => {
                          const best = item.formats.find(f => f.recommended) || item.formats[0];
                          handleDownloadFormat(best, item.title);
                        }}
                        icon={<ArrowDownCircle className="w-3.5 h-3.5" />}
                      >
                        Grab Best
                      </SmoothButton>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
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
