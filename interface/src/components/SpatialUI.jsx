import React from 'react';
import { motion } from 'framer-motion';

export function SpatialWindow({ children, title, subtitle, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98, y: -10 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      /* Ultrawide 2.1:1 landscape spatial computing workspace: 88-92vw, max 1440px */
      className={`relative w-[92vw] max-w-[1440px] mx-auto vision-window rounded-[40px] px-8 sm:px-14 py-8 sm:py-11 my-6 overflow-hidden flex flex-col justify-between ${className}`}
    >
      <div>
        {/* Floating Spatial Window Header with tactile grab capsule and window controls */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-[var(--border-glass)]">
          <div className="flex items-center gap-3">
            <div className="w-3.5 h-3.5 rounded-full bg-[#70777E]/60 hover:bg-[#70777E] transition-colors shadow-sm cursor-pointer" />
            <div className="w-3.5 h-3.5 rounded-full bg-[#AEB5BB]/60 hover:bg-[#AEB5BB] transition-colors shadow-sm cursor-pointer" />
            <div className="w-3.5 h-3.5 rounded-full bg-[#D9DDE0]/70 hover:bg-[#D9DDE0] transition-colors shadow-sm cursor-pointer" />
          </div>

          {/* Top Window Bar Grab Capsule */}
          <div className="flex items-center gap-2.5 px-5 py-1.5 rounded-full bg-[var(--card-glass)] border border-[var(--border-glass)] shadow-sm">
            <div className="w-10 h-1 rounded-full bg-[var(--text-muted)] opacity-60" />
            <span className="text-xs font-mono font-semibold tracking-widest uppercase opacity-85 text-[#F4F5F6]">
              ZENTHLYR
            </span>
          </div>

          <div className="text-xs font-mono px-3 py-1 rounded-full bg-[var(--card-glass)] border border-[var(--border-glass)] text-[#AEB5BB]">
            Spatial OS 2.0
          </div>
        </div>

        {(title || subtitle) && (
          <div className="mb-8 text-left">
            {title && (
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#F4F5F6] mb-2 font-mono">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-sm sm:text-base text-[#AEB5BB] max-w-3xl leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {children}
      </div>
    </motion.div>
  );
}

import SmoothButton from './SmoothButton';
export { SmoothButton };

export function VisionButton(props) {
  let variant = 'soft';
  if (props.variant === 'primary') variant = 'candy';
  else if (props.variant === 'accent') variant = 'solid';
  else if (props.variant === 'ghost') variant = 'ghost';

  return <SmoothButton {...props} variant={variant} />;
}
