import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AppProvider } from './context/AppContext';
import { SpatialOrnament } from './components/SpatialOrnament';
import SpatialParticles from './components/SpatialParticles';

// Structured Feature Pages
import SplashScreen from './pages/onboarding/SplashScreen';
import OnboardingScreen from './pages/onboarding/OnboardingScreen';
import LandingPage from './pages/onboarding/LandingPage';
import HomePage from './pages/downloader/HomePage';
import HistoryPage from './pages/downloader/HistoryPage';
import DownloadsVaultPage from './pages/vault/DownloadsVaultPage';
import PlatformsPage from './pages/platforms/PlatformsPage';
import PreferencesPage from './pages/system/PreferencesPage';
import SettingsPage from './pages/system/SettingsPage';
import ProfilePage from './pages/system/ProfilePage';
import { TermsPage, PrivacyPage } from './pages/legal/LegalPages';

function AppLayout() {
  const location = useLocation();
  const hideOrnament = location.pathname === '/' || location.pathname === '/onboarding' || location.pathname === '/welcome';

  return (
    <div className="relative min-h-screen bg-[#121518] selection:bg-[var(--text-primary)] selection:text-[var(--bg-spatial)] flex flex-col justify-center items-center py-8">
      {/* Fixed Ambient Spatial Background Canvas Layer */}
      <div className="spatial-backdrop-layer" />

      {/* Dynamic Ambient Spatial Particle Layer with Left-Dark & Right-Bright Duality */}
      <SpatialParticles />

      {/* Volumetric Radial Lighting Matching Particle Gradient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Darker shadow depth on left */}
        <div className="absolute top-1/4 -left-32 w-[600px] h-[500px] rounded-full bg-[#212529] filter blur-[150px] opacity-65" />
        {/* Brighter specular light radiance on right */}
        <div className="absolute top-1/4 -right-32 w-[650px] h-[550px] rounded-full bg-[var(--specular)] filter blur-[140px] opacity-40" />
      </div>

      <div className="relative z-10 w-full px-4 flex justify-center">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Sequential Onboarding Flow: Splash -> Onboarding -> Landing -> Home */}
            <Route path="/" element={<SplashScreen />} />
            <Route path="/onboarding" element={<OnboardingScreen />} />
            <Route path="/welcome" element={<LandingPage />} />
            <Route path="/deck" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/vault" element={<DownloadsVaultPage />} />
            <Route path="/platforms" element={<PlatformsPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/preferences" element={<PreferencesPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
          </Routes>
        </AnimatePresence>
      </div>

      {/* visionOS Spatial Floating Navigation Ornament */}
      {!hideOrnament && <SpatialOrnament />}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </AppProvider>
  );
}
