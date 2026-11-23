import React from 'react';
import { motion } from 'framer-motion';

export function SpatialWindow({ children, title, subtitle, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: -10 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      /* Wide cinematic landscape card aspect ratio */
      className={`relative w-full max-w-[1080px] min-h-[500px] mx-auto vision-window rounded-[36px] px-8 sm:px-12 py-7 sm:py-8 my-4 overflow-hidden flex flex-col justify-between ${className}`}
    >
      <div>
        {/* visionOS Grab Capsule / 3 Distinct Circular Action Controls (as shown in reference image) */}
        <div className="flex items-center justify-between pb-5 mb-6 border-b border-[var(--border-glass)]">
          <div className="flex items-center gap-2.5">
            <div className="w-3.5 h-3.5 rounded-full bg-[#6c757d]/60 hover:bg-[#6c757d] transition-colors shadow-sm" />
            <div className="w-3.5 h-3.5 rounded-full bg-[#adb5bd]/60 hover:bg-[#adb5bd] transition-colors shadow-sm" />
            <div className="w-3.5 h-3.5 rounded-full bg-[#ced4da]/70 hover:bg-[#ced4da] transition-colors shadow-sm" />
          </div>

          {/* Top Window Bar Grab Capsule */}
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--card-glass)] border border-[var(--border-glass)] shadow-sm">
            <div className="w-8 h-1 rounded-full bg-[var(--text-muted)] opacity-60" />
            <span className="text-xs font-mono font-semibold tracking-widest uppercase opacity-70">
              ZENTHLYR
            </span>
          </div>

          <div className="text-xs font-mono px-2.5 py-1 rounded-full bg-[var(--card-glass)] border border-[var(--border-glass)] text-[var(--text-muted)]">
            Spatial UI 2.0
          </div>
        </div>

        {(title || subtitle) && (
          <div className="mb-6 text-left">
            {title && (
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="mt-1 text-xs sm:text-sm text-[var(--text-muted)]">
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
