import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';
import { SpatialWindow, VisionButton } from '../components/SpatialUI';

export function TermsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-4 sm:p-8 flex flex-col items-center justify-start pb-32">
      <SpatialWindow
        title="Terms of Service"
        subtitle="Legal guidelines for using the ZENTHLYR Spatial Downloader"
      >
        <div className="space-y-6 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
          <section className="vision-card p-5 rounded-2xl border border-[var(--border-glass)]">
            <h3 className="text-base font-bold text-[var(--text-primary)] mb-2">1. Permitted Use</h3>
            <p>
              ZENTHLYR provides utility tools to access, process, and download personal and public media content. You agree to use the service strictly in compliance with applicable local and international copyright laws and fair-use standards.
            </p>
          </section>

          <section className="vision-card p-5 rounded-2xl border border-[var(--border-glass)]">
            <h3 className="text-base font-bold text-[var(--text-primary)] mb-2">2. Intellectual Property</h3>
            <p>
              We do not host, store, or claim ownership of any media files analyzed or streamed. Content rights remain exclusively with the original creators and respective hosting platforms.
            </p>
          </section>

          <section className="vision-card p-5 rounded-2xl border border-[var(--border-glass)]">
            <h3 className="text-base font-bold text-[var(--text-primary)] mb-2">3. Service Availability</h3>
            <p>
              Extraction velocity and format availability may vary based on upstream platform API modifications. The service is provided on an "as-is" and "as-available" basis.
            </p>
          </section>

          <div className="pt-4">
            <VisionButton
              variant="default"
              onClick={() => navigate(-1)}
              icon={<ArrowLeft className="w-4 h-4" />}
            >
              Back
            </VisionButton>
          </div>
        </div>
      </SpatialWindow>
    </div>
  );
}

export function PrivacyPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-4 sm:p-8 flex flex-col items-center justify-start pb-32">
      <SpatialWindow
        title="Privacy Policy"
        subtitle="How ZENTHLYR safeguards your privacy and data"
      >
        <div className="space-y-6 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
          <section className="vision-card p-5 rounded-2xl border border-[var(--border-glass)]">
            <h3 className="text-base font-bold text-[var(--text-primary)] mb-2">1. Zero Log Guarantee</h3>
            <p>
              ZENTHLYR operates without user accounts. We do not store, track, or sell your submitted URLs, IP addresses, or downloaded files on external databases.
            </p>
          </section>

          <section className="vision-card p-5 rounded-2xl border border-[var(--border-glass)]">
            <h3 className="text-base font-bold text-[var(--text-primary)] mb-2">2. Client-Side Persistence</h3>
            <p>
              Your extraction history and preferences are saved strictly within your browser's local sandbox (LocalStorage). You maintain total authority to flush this cache at any time.
            </p>
          </section>

          <section className="vision-card p-5 rounded-2xl border border-[var(--border-glass)]">
            <h3 className="text-base font-bold text-[var(--text-primary)] mb-2">3. Direct Data Transport</h3>
            <p>
              Media files are streamed directly via secure HTTPS proxy pipes with standard TLS encryption.
            </p>
          </section>

          <div className="pt-4">
            <VisionButton
              variant="default"
              onClick={() => navigate(-1)}
              icon={<ArrowLeft className="w-4 h-4" />}
            >
              Back
            </VisionButton>
          </div>
        </div>
      </SpatialWindow>
    </div>
  );
}
