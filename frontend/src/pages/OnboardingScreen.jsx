import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Video, 
  Headphones, 
  Layers, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { SpatialWindow, VisionButton } from '../components/SpatialUI';

const ONBOARDING_SLIDES = [
  {
    icon: Zap,
    title: "Sub-3-Second Extraction",
    subtitle: "Real-time stream resolution across global media platforms without waiting.",
    badge: "LIGHTNING VELOCITY"
  },
  {
    icon: Video,
    title: "Pure Lossless 4K & HDR",
    subtitle: "Capture pristine master resolution video directly from Instagram, TikTok, YouTube, and X.",
    badge: "HIGHEST FIDELITY"
  },
  {
    icon: Headphones,
    title: "Lossless Audio Streaming",
    subtitle: "Export crystal-clear 320kbps MP3 and M4A masters from any video or audio post.",
    badge: "STUDIO GRADE"
  },
  {
    icon: Layers,
    title: "Universal Platform Core",
    subtitle: "Over 1,800 supported media sites unified into one seamless visionOS spatial experience.",
    badge: "ALL PLATFORMS"
  }
];

export default function OnboardingScreen() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentSlide < ONBOARDING_SLIDES.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      localStorage.setItem('zenthlyr_onboarded', 'true');
      navigate('/welcome');
    }
  };

  const slide = ONBOARDING_SLIDES[currentSlide];
  const Icon = slide.icon;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <SpatialWindow className="max-w-xl text-center py-12">
        <div className="flex justify-center mb-6">
          <span className="text-[10px] font-mono font-bold tracking-widest px-3 py-1 rounded-full bg-[var(--card-glass)] border border-[var(--border-glass)] text-[var(--text-muted)] uppercase">
            {slide.badge}
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -25 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="flex flex-col items-center"
          >
            <div className="w-20 h-20 rounded-3xl vision-card flex items-center justify-center mb-8 border border-[var(--specular)] shadow-xl">
              <Icon className="w-10 h-10 text-[var(--text-primary)]" />
            </div>

            <h2 className="text-3xl font-extrabold text-[var(--text-primary)] tracking-tight mb-3">
              {slide.title}
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-sm mb-10 leading-relaxed">
              {slide.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Dots Indicator */}
        <div className="flex justify-center items-center gap-2 mb-10">
          {ONBOARDING_SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'w-8 bg-[var(--text-primary)]' 
                  : 'w-2 bg-[var(--text-muted)]/40 hover:bg-[var(--text-muted)]'
              }`}
            />
          ))}
        </div>

        <div className="flex items-center justify-between gap-4 pt-4 border-t border-[var(--border-glass)]">
          <button
            onClick={() => {
              localStorage.setItem('zenthlyr_onboarded', 'true');
              navigate('/welcome');
            }}
            className="text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors px-4 py-2"
          >
            Skip Intro
          </button>

          <VisionButton
            variant="primary"
            onClick={handleNext}
            icon={<ArrowRight className="w-4 h-4" />}
          >
            {currentSlide === ONBOARDING_SLIDES.length - 1 ? 'Enter Zenthlyr' : 'Continue'}
          </VisionButton>
        </div>
      </SpatialWindow>
    </div>
  );
}
