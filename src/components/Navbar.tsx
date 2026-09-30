import React from 'react';
import { Activity, ExternalLink, ArrowRight, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onOpenN8nModal: () => void;
  n8nStatus: { reachable: boolean; latencyMs?: number };
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenN8nModal, n8nStatus }) => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#0b0f17]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single element brand wordmark */}
        <a 
          href="#" 
          className="text-lg font-bold tracking-tight text-white transition-opacity hover:opacity-90"
        >
          ResumeLens
        </a>

        {/* Zone 2: Clean 4-6 text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <button 
            onClick={() => scrollToSection('analyzer-form')} 
            className="hover:text-cyan-400 transition-colors cursor-pointer"
          >
            Analyzer
          </button>
          <button 
            onClick={() => scrollToSection('capabilities')} 
            className="hover:text-cyan-400 transition-colors cursor-pointer"
          >
            Capabilities
          </button>
          <button 
            onClick={() => scrollToSection('pipeline')} 
            className="hover:text-cyan-400 transition-colors cursor-pointer"
          >
            n8n Pipeline
          </button>
          <button 
            onClick={() => scrollToSection('benchmarks')} 
            className="hover:text-cyan-400 transition-colors cursor-pointer"
          >
            Benchmarks
          </button>
          <button 
            onClick={() => scrollToSection('faq')} 
            className="hover:text-cyan-400 transition-colors cursor-pointer"
          >
            FAQ
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenN8nModal}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-white px-3 py-1.5 rounded-md border border-slate-800 hover:border-slate-700 bg-slate-900/60 transition-all cursor-pointer whitespace-nowrap"
            title="Inspect n8n Cloud Webhook Gateway"
          >
            <span className={`inline-block w-2 h-2 rounded-full ${n8nStatus.reachable ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            <span>n8n Gateway</span>
            <ExternalLink className="w-3 h-3 text-slate-400 ml-0.5" />
          </button>

          <button
            onClick={() => scrollToSection('analyzer-form')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 active:bg-cyan-500 px-4 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
          >
            <span>Analyze Resume</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
