import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { SpatialWindow, VisionButton } from '../../components/SpatialUI';

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    // Flow: Splash -> Onboarding (or user clicks Skip to go immediately to Onboarding)
    const timer = setTimeout(() => {
      navigate('/onboarding');
    }, 2400);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <SpatialWindow className="max-w-xl text-center py-16">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: [0.8, 1.05, 1], opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex flex-col items-center justify-center"
        >
          {/* Spatial 3D AI App Icon Lens */}
          <div className="relative w-32 h-32 mb-8 rounded-full flex items-center justify-center vision-card shadow-[0_0_60px_rgba(206,212,218,0.35)] border border-[var(--specular)] overflow-hidden">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-dashed border-white/30 z-10 pointer-events-none"
            />
            <img 
              src="/logo.png" 
              alt="ZENTHLYR Spatial Logo" 
              className="w-full h-full object-cover scale-105"
            />
          </div>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tighter text-[var(--text-primary)] mb-2 font-mono">
            ZENTHLYR
          </h1>
          <p className="text-sm font-medium tracking-widest uppercase text-[var(--text-muted)] mb-8">
            Spatial UI Universal Media Intelligence
          </p>

          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[var(--text-primary)] animate-ping" />
            <span className="text-xs font-mono text-[var(--text-muted)]">
              Calibrating Spatial Environment...
            </span>
          </div>

          <div className="mt-10">
            <VisionButton
              variant="ghost"
              onClick={() => navigate('/onboarding')}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Skip
            </VisionButton>
          </div>
        </motion.div>
      </SpatialWindow>
    </div>
  );
}
