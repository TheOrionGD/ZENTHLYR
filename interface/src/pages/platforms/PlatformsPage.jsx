import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Layers, 
  Search, 
  Video, 
  Headphones, 
  Image as ImageIcon, 
  Sparkles,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import { SpatialWindow, VisionButton } from '../../components/SpatialUI';

const PLATFORM_CATALOG = [
  {
    id: 'instagram',
    name: 'Instagram',
    category: 'Social Media',
    formats: ['Reels (1080p)', 'Carousel Posts', 'Stories', 'Original Audio'],
    description: 'High-speed reel and multi-slide post extraction without login requirements.',
    color: '#ced4da'
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    category: 'Short Video',
    formats: ['HD Video No-Watermark', 'Original MP3 Audio', 'Slide Photos'],
    description: 'Direct clean extraction with watermark stripping algorithms.',
    color: '#dee2e6'
  },
  {
    id: 'youtube',
    name: 'YouTube & Shorts',
    category: 'Video & Streaming',
    formats: ['4K Ultra HD', '1080p Full HD', 'Shorts', '320kbps MP3 Audio'],
    description: 'Full resolution multi-stream merger with high dynamic range audio.',
    color: '#adb5bd'
  },
  {
    id: 'twitter',
    name: 'X (Twitter)',
    category: 'Micro-blogging',
    formats: ['Original MP4 (Highest Bitrate)', 'GIF Loops', 'Lossless Images'],
    description: 'Direct stream extraction from status threads and media posts.',
    color: '#6c757d'
  },
  {
    id: 'pinterest',
    name: 'Pinterest',
    category: 'Visual & Pins',
    formats: ['Original High-Res JPEG', 'Idea Pins Video', 'GIFs'],
    description: 'Captures full master resolution photos without mobile compression.',
    color: '#495057'
  },
  {
    id: 'facebook',
    name: 'Facebook',
    category: 'Social Media',
    formats: ['Public Watch HD', 'Facebook Reels', 'Direct Clips'],
    description: 'High-definition 1080p public video and reel extractor.',
    color: '#343a40'
  },
  {
    id: 'reddit',
    name: 'Reddit',
    category: 'Community',
    formats: ['Merged Audio/Video MP4', 'i.redd.it Images', 'Galleries'],
    description: 'Automatically combines separate v.redd.it video and audio streams.',
    color: '#6c757d'
  },
  {
    id: 'threads',
    name: 'Threads',
    category: 'Social Media',
    formats: ['High-Res Photos', 'Short Videos (MP4)'],
    description: 'Extracts media directly from public Threads URLs.',
    color: '#ced4da'
  },
  {
    id: 'spotify',
    name: 'Spotify',
    category: 'Music & Audio',
    formats: ['Master Metadata', 'Album Art (Ultra HD)', 'High-Fidelity Audio Preview'],
    description: 'Detailed track metadata tagger and audio preview collector.',
    color: '#adb5bd'
  },
  {
    id: 'soundcloud',
    name: 'SoundCloud',
    category: 'Music & Audio',
    formats: ['HQ Audio MP3', 'Cover Art', 'Lossless WAV Streams'],
    description: 'Direct track and remix stream extractor.',
    color: '#dee2e6'
  },
  {
    id: 'vimeo',
    name: 'Vimeo',
    category: 'Video & Streaming',
    formats: ['4K Masters', '1080p Pro', 'Audio Stems'],
    description: 'Cinematic format extraction for creators.',
    color: '#e9ecef'
  },
  {
    id: 'generic',
    name: '1800+ Global Web Platforms',
    category: 'Universal',
    formats: ['MP4 Video', 'MP3 Audio', 'Lossless Web Images'],
    description: 'Universal fallback engine supporting over 1,800 multimedia sites.',
    color: '#f8f9fa'
  }
];

export default function PlatformsPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Social Media', 'Short Video', 'Video & Streaming', 'Music & Audio', 'Visual & Pins'];

  const filtered = PLATFORM_CATALOG.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                          p.description.toLowerCase().includes(search.toLowerCase());
    const matchesCat = activeCategory === 'All' || p.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-screen p-4 sm:p-8 flex flex-col items-center justify-start pb-32">
      <SpatialWindow
        title="Spatial Platform Matrix"
        subtitle="Explore supported social networks, format specifications, and extraction engines"
      >
        {/* Search & Category Pills */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 flex items-center gap-2 px-4 py-2 rounded-full vision-card border border-[var(--border-glass)]">
            <Search className="w-4 h-4 text-[var(--text-muted)]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search platforms (e.g. Instagram, 4K, Spotify)..."
              className="w-full bg-transparent border-none outline-none text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)]"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-[var(--text-primary)] text-[var(--bg-spatial)] shadow-md'
                    : 'vision-card text-[var(--text-muted)] hover:text-[var(--text-primary)] border border-[var(--border-glass)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Platform Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="vision-card rounded-3xl p-5 border border-[var(--border-glass)] flex flex-col justify-between hover:border-[var(--text-primary)]/40 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold tracking-wider uppercase text-[var(--text-muted)]">
                    {item.category}
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 shadow-[0_0_8px_rgba(52,211,153,0.8)]" title="Active Core" />
                </div>

                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1">
                  {item.name}
                </h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-2">
                  Supported Formats:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {item.formats.map((fmt, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[var(--window-glass)] border border-[var(--border-glass)] text-[var(--text-primary)]"
                    >
                      {fmt}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </SpatialWindow>
    </div>
  );
}
