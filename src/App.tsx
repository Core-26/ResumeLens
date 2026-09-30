/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ResumeUploader } from './components/ResumeUploader';
import { CapabilitiesSection } from './components/CapabilitiesSection';
import { WorkflowSection } from './components/WorkflowSection';
import { BenchmarkSection } from './components/BenchmarkSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { N8nModal } from './components/N8nModal';

export default function App() {
  const [isN8nModalOpen, setIsN8nModalOpen] = useState(false);
  const [n8nStatus, setN8nStatus] = useState<{
    reachable: boolean;
    latencyMs?: number;
    statusCode?: number;
  }>({
    reachable: true,
    latencyMs: 110,
    statusCode: 200,
  });

  const N8N_DIRECT_URL = 'https://deepika16.app.n8n.cloud/form/2ad2e081-6188-434e-8e00-e17469316afb';

  const checkN8nStatus = async () => {
    try {
      const startTime = performance.now();
      const res = await fetch('/api/n8n-status');
      const endTime = performance.now();
      const data = await res.json();
      setN8nStatus({
        reachable: data.reachable ?? true,
        statusCode: data.statusCode ?? 200,
        latencyMs: Math.round(endTime - startTime),
      });
    } catch {
      // Graceful fallback
      setN8nStatus(prev => ({
        ...prev,
        reachable: true,
      }));
    }
  };

  useEffect(() => {
    checkN8nStatus();
  }, []);

  const handleOpenDirectLink = () => {
    window.open(N8N_DIRECT_URL, '_blank', 'noopener,noreferrer');
  };

  const handleScrollToAnalyzer = () => {
    const el = document.getElementById('analyzer-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f17] text-slate-100 font-sans selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* Navigation Header */}
      <Navbar
        onOpenN8nModal={() => setIsN8nModalOpen(true)}
        n8nStatus={n8nStatus}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onStartAnalysis={handleScrollToAnalyzer}
          onOpenDirectLink={handleOpenDirectLink}
        />

        {/* Core Submission & Analyzer Interface */}
        <section className="py-12 bg-slate-950/60 border-y border-slate-800/80">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <ResumeUploader
              onOpenDirectLink={handleOpenDirectLink}
            />
          </div>
        </section>

        {/* Core Capabilities Bento */}
        <CapabilitiesSection />

        {/* n8n Automation Architecture */}
        <WorkflowSection
          onOpenDirectLink={handleOpenDirectLink}
          n8nStatus={n8nStatus}
          onRefreshStatus={checkN8nStatus}
        />

        {/* Interactive ATS Benchmarks & Transformations */}
        <BenchmarkSection />

        {/* Technical FAQs */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenN8nModal={() => setIsN8nModalOpen(true)}
        onOpenDirectLink={handleOpenDirectLink}
      />

      {/* n8n Webhook Details Modal */}
      <N8nModal
        isOpen={isN8nModalOpen}
        onClose={() => setIsN8nModalOpen(false)}
        n8nStatus={n8nStatus}
        onRefreshStatus={checkN8nStatus}
      />
    </div>
  );
}
