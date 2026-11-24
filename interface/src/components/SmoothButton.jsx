import React from 'react';
import { motion } from 'framer-motion';

/**
 * SmoothButton - Polished SmoothUI animation primitive adapted for Apple visionOS
 * Features:
 * - Variants: candy, solid, soft, outline, ghost, link
 * - Tactile micro-interactions: spring-damped whileHover & whileTap
 * - Specular highlight reflections & optical border inset
 */
export default function SmoothButton({
  children,
  onClick,
  variant = 'solid', // 'candy' | 'solid' | 'soft' | 'outline' | 'ghost' | 'link'
  size = 'default',   // 'xs' | 'sm' | 'default' | 'lg' | 'icon'
  disabled = false,
  icon = null,
  className = '',
  type = 'button',
  ...props
}) {
  // Base classes for visionOS + SmoothUI layout
  const baseClasses = "relative inline-flex items-center justify-center font-medium rounded-full cursor-pointer select-none transition-colors overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text-primary)]";

  // Size scales
  const sizeClasses = {
    xs: "px-2.5 py-1 text-xs gap-1.5",
    sm: "px-3.5 py-1.5 text-xs gap-1.5",
    default: "px-5 py-2.5 text-sm gap-2",
    lg: "px-7 py-3 text-base gap-2.5",
    icon: "w-10 h-10 p-0 text-sm"
  }[size] || "px-5 py-2.5 text-sm gap-2";

  // Style Variants matching exact monochromatic palette:
  // Deep charcoal: #31373D, Graphite: #4F5459, Steel grey: #70777E, Silver grey: #AEB5BB, Mist grey: #D9DDE0, Soft white: #F4F5F6
  let variantClasses = "";
  if (variant === 'candy') {
    // Spatial Candy variant with pure liquid silver specular reflection & 3D bevel
    variantClasses = "bg-gradient-to-b from-[#F4F5F6] via-[#D9DDE0] to-[#AEB5BB] text-[#31373D] font-bold shadow-[0_12px_28px_-6px_rgba(0,0,0,0.45),0_2px_0_0_rgba(255,255,255,0.9)_inset,0_-2px_0_0_rgba(49,55,61,0.25)_inset] border border-white/70";
  } else if (variant === 'solid') {
    variantClasses = "bg-[#F4F5F6] text-[#31373D] font-bold shadow-lg shadow-black/35 hover:bg-[#D9DDE0] border border-white/40";
  } else if (variant === 'soft') {
    variantClasses = "bg-[var(--card-glass)] text-[#F4F5F6] border border-[var(--border-glass)] backdrop-blur-xl shadow-sm hover:bg-[var(--border-glass)] hover:text-white";
  } else if (variant === 'outline') {
    variantClasses = "bg-transparent text-[#F4F5F6] border border-[var(--border-glass)] hover:border-[#D9DDE0] hover:bg-[var(--card-glass)]";
  } else if (variant === 'ghost') {
    variantClasses = "bg-transparent text-[#AEB5BB] hover:text-[#F4F5F6] hover:bg-[var(--card-glass)]";
  } else if (variant === 'link') {
    variantClasses = "bg-transparent text-[#D9DDE0] underline-offset-4 hover:underline p-0";
  }

  // SmoothUI Motion animation spring configuration
  return (
    <motion.button
      type={type}
      whileHover={disabled ? undefined : { 
        scale: 1.025,
        y: -1.5,
        transition: { type: "spring", stiffness: 450, damping: 22 }
      }}
      whileTap={disabled ? undefined : { 
        scale: 0.96,
        y: 0.5,
        transition: { type: "spring", stiffness: 500, damping: 18 }
      }}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${disabled ? 'opacity-40 cursor-not-allowed' : ''} ${className}`}
      {...props}
    >
      {/* Glossy top specular reflection layer for candy & visionOS */}
      {variant === 'candy' && (
        <span 
          aria-hidden="true" 
          className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/70 to-transparent rounded-t-full pointer-events-none" 
        />
      )}
      {icon && <span className="relative z-10 flex items-center justify-center">{icon}</span>}
      <span className="relative z-10 flex items-center gap-1.5">{children}</span>
    </motion.button>
  );
}
