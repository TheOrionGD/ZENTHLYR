import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { AlertCircle, CheckCircle2, Info, AlertTriangle } from 'lucide-react';

/**
 * 1. SmoothText - Motion animated text display with staggered letter/word fades & visionOS tracking
 */
export function SmoothText({ 
  text, 
  as = "h1", 
  className = "", 
  stagger = 0.02,
  animation = "fadeIn" 
}) {
  const Component = motion[as] || motion.h1;
  const words = typeof text === 'string' ? text.split(" ") : [];

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: stagger, delayChildren: 0.05 }
    }
  };

  const child = {
    hidden: { opacity: 0, y: 8, filter: "blur(4px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { type: "spring", damping: 20, stiffness: 300 }
    }
  };

  if (typeof text !== 'string') {
    return <Component className={className}>{text}</Component>;
  }

  return (
    <Component
      variants={container}
      initial="hidden"
      animate="visible"
      className={`inline-flex flex-wrap gap-x-1.5 ${className}`}
    >
      {words.map((word, index) => (
        <motion.span key={index} variants={child} className="inline-block">
          {word}
        </motion.span>
      ))}
    </Component>
  );
}

/**
 * 2. SmoothBadge - Status indicator & presence dot badge with pulse glow
 */
export function SmoothBadge({ 
  children, 
  variant = 'default', // 'default' | 'success' | 'warning' | 'destructive' | 'outline' | 'candy'
  dot = false, 
  pulse = false,
  className = "" 
}) {
  const variantStyles = {
    default: "bg-[var(--card-glass)] text-[var(--text-primary)] border border-[var(--border-glass)]",
    candy: "bg-gradient-to-r from-white/90 via-slate-100 to-slate-300 text-black font-semibold border border-white/60 shadow-sm",
    success: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
    warning: "bg-amber-500/15 text-amber-300 border border-amber-500/30",
    destructive: "bg-rose-500/15 text-rose-300 border border-rose-500/30",
    outline: "bg-transparent text-[var(--text-muted)] border border-[var(--border-glass)]"
  }[variant] || "bg-[var(--card-glass)] text-[var(--text-primary)] border border-[var(--border-glass)]";

  return (
    <motion.span
      initial={{ scale: 0.92, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono tracking-wider backdrop-blur-md ${variantStyles} ${className}`}
    >
      {dot && (
        <span className="relative flex h-2 w-2">
          {pulse && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75" />
          )}
          <span className="relative inline-flex rounded-full h-2 w-2 bg-current" />
        </span>
      )}
      {children}
    </motion.span>
  );
}

/**
 * 3. SmoothAlert - Animated notification card with spring entry and blur backdrop
 */
export function SmoothAlert({ 
  title, 
  description, 
  variant = "destructive", // 'destructive' | 'success' | 'warning' | 'info'
  onClose = null,
  className = "" 
}) {
  const iconMap = {
    destructive: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-sky-400 shrink-0" />
  };

  const styleMap = {
    destructive: "bg-rose-950/20 border-rose-500/30 text-rose-200",
    success: "bg-emerald-950/20 border-emerald-500/30 text-emerald-200",
    warning: "bg-amber-950/20 border-amber-500/30 text-amber-200",
    info: "bg-sky-950/20 border-sky-500/30 text-sky-200"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 450, damping: 25 }}
      className={`relative flex items-start gap-3 p-4 rounded-2xl border backdrop-blur-2xl shadow-lg ${styleMap[variant] || styleMap.destructive} ${className}`}
    >
      {iconMap[variant]}
      <div className="flex-1 text-left">
        {title && <h5 className="font-semibold text-sm leading-tight mb-1">{title}</h5>}
        {description && <p className="text-xs opacity-90 leading-relaxed">{description}</p>}
      </div>
      {onClose && (
        <button 
          onClick={onClose}
          className="text-xs opacity-60 hover:opacity-100 px-2 py-0.5 rounded-full hover:bg-white/10 transition-all"
        >
          Dismiss
        </button>
      )}
    </motion.div>
  );
}

/**
 * 4. SmoothTabs - Animated tab navigation with layoutId spring pill indicator
 */
export function SmoothTabs({ 
  tabs = [], 
  activeTab, 
  onChange, 
  className = "" 
}) {
  return (
    <div className={`relative flex items-center gap-1.5 p-1 rounded-full vision-card border border-[var(--border-glass)] backdrop-blur-2xl ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`relative px-4 py-1.5 rounded-full text-xs font-semibold select-none cursor-pointer transition-colors duration-200 ${
              isActive ? 'text-[var(--bg-spatial)] font-bold' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="smooth-tab-indicator"
                transition={{ type: "spring", stiffness: 500, damping: 32 }}
                className="absolute inset-0 rounded-full bg-[var(--text-primary)] shadow-md shadow-black/20"
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              {tab.icon && <span>{tab.icon}</span>}
              {tab.label}
              {tab.count !== undefined && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-black/20 text-white' : 'bg-[var(--card-glass)] text-[var(--text-muted)]'}`}>
                  {tab.count}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/**
 * 5. SmoothNavigation - visionOS Floating pill navigation with spring active sliding pill
 */
export function SmoothNavigation({ items = [], className = "" }) {
  return (
    <nav className={`flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full vision-ornament shadow-2xl backdrop-blur-3xl ${className}`}>
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `
              relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full select-none transition-all
              ${isActive ? 'text-[var(--bg-spatial)] font-bold' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--card-glass)]'}
            `}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="smooth-nav-active-pill"
                    transition={{ type: "spring", stiffness: 450, damping: 28 }}
                    className="absolute inset-0 rounded-full bg-[var(--text-primary)] shadow-lg shadow-black/30"
                  />
                )}
                <motion.span 
                  whileHover={{ scale: 1.15, rotate: 2 }}
                  whileTap={{ scale: 0.9 }}
                  className="relative z-10"
                >
                  <Icon className="w-5 h-5" />
                </motion.span>
              </>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
}
