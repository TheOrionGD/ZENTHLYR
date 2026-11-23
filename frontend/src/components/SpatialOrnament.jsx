import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  DownloadCloud,
  Layers,
  FolderDown,
  History,
  Sliders,
  Settings,
  User,
  Sun,
  Moon
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export function SpatialOrnament() {
  const { theme, toggleTheme } = useApp();

  const navItems = [
    { to: '/deck', icon: DownloadCloud, label: 'Download Deck' },
    { to: '/vault', icon: FolderDown, label: 'Vault (Downloads)' },
    { to: '/platforms', icon: Layers, label: 'Platforms Matrix' },
    { to: '/history', icon: History, label: 'History' },
    { to: '/preferences', icon: Sliders, label: 'Preferences' },
    { to: '/settings', icon: Settings, label: 'Settings' },
    { to: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
      <motion.nav
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15, type: 'spring', damping: 22, stiffness: 300 }}
        className="flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full vision-ornament shadow-2xl backdrop-blur-3xl"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `
                relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full select-none cursor-pointer transition-colors duration-200
                ${isActive
                  ? 'text-[var(--bg-spatial)] font-bold'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--card-glass)]'
                }
              `}
              title={item.label}
            >
              {({ isActive }) => (
                <>
                  {/* SmoothUI Spring Layout Pill Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="smooth-ornament-pill"
                      transition={{ type: "spring", stiffness: 450, damping: 28 }}
                      className="absolute inset-0 rounded-full bg-[var(--text-primary)] shadow-lg shadow-black/30"
                    />
                  )}
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 2 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 500, damping: 18 }}
                    className="relative z-10 flex items-center justify-center"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.div>
                </>
              )}
            </NavLink>
          );
        })}

        <div className="w-[1px] h-6 bg-[var(--border-glass)] mx-1" />

        <motion.button
          whileHover={{ scale: 1.12, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Switch to Light Steel' : 'Switch to Spatial Dark'}
          className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--card-glass)] cursor-pointer transition-colors"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5 text-[#f8f9fa]" /> : <Moon className="w-5 h-5 text-[#343a40]" />}
        </motion.button>
      </motion.nav>
    </div>
  );
}
