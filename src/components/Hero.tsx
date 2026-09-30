import React from 'react';
import { ArrowDown, CheckCircle2, Zap, Shield, Sparkles } from 'lucide-react';
import heroImg from '../assets/images/hero_resume_analyzer_1790759643313.jpg';

interface HeroProps {
  onStartAnalysis: () => void;
  onOpenDirectLink: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartAnalysis, onOpenDirectLink }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
      {/* Background ambient lighting */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:-top-80"
      >
        <div 
          className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-cyan-900/30 to-blue-700/20 opacity-30" 
          style={{
            clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
          }} 
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Proposition and Call to Action */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Clean unboxed metadata kicker */}
            <div className="flex items-center gap-2 text-xs font-medium text-cyan-400">
              <span>n8n Cloud Automation</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Deepika Production Workflow</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>v2.4 Live Webhook</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] [text-wrap:balance]">
              Automated Resume Analyzer for High-Stakes Career Moves.
            </h1>

            {/* Concrete Value Proposition */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Submit your resume directly to our automated cloud pipeline. We extract career milestones, measure ATS parseability, quantify leadership impact, and deliver prioritized recommendations straight to your inbox.
            </p>

            {/* Unboxed Metadata Stats */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-medium text-slate-400 pt-1">
              <span className="flex items-center gap-1.5 text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Zero ATS Blindspots</span>
              </span>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <span className="flex items-center gap-1.5 text-slate-200">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>Instant n8n Webhook Dispatch</span>
              </span>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <span className="flex items-center gap-1.5 text-slate-200">
                <Shield className="w-4 h-4 text-blue-400" />
                <span>Encrypted In-Transit</span>
              </span>
            </div>

            {/* Primary Action Button Bar */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onStartAnalysis}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 active:bg-cyan-500 rounded-lg shadow-lg shadow-cyan-950/40 transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Upload & Audit Resume</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenDirectLink}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-medium text-slate-300 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>Direct n8n Form Gateway</span>
              </button>
            </div>

            {/* Adjacent Proof Statement */}
            <div className="pt-2 text-xs text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Targeting: Software, Product, Data, Leadership & Operations roles</span>
            </div>

          </div>

          {/* Right Column: Hero Visual Focal Carrier */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/50 shadow-2xl">
              {/* Image asset with fallback container */}
              <div className="relative aspect-[16/9] lg:aspect-[4/3] w-full bg-slate-900 overflow-hidden">
                <img
                  src={heroImg}
                  alt="ResumeLens career analytics workspace"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  onError={(e) => {
                    // Fallback to subtle gradient container if image loading fails
                    e.currentTarget.style.display = 'none';
                  }}
                />
                
                {/* Measured Scrim for legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                
                {/* Overlay card with quantitative proof */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800/80 text-left">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span>Target Endpoint</span>
                    <span className="font-mono text-cyan-400">deepika16.app.n8n.cloud</span>
                  </div>
                  <div className="flex items-center justify-between text-sm font-semibold text-white">
                    <span>Workflow: Resume Analyzer</span>
                    <span className="text-emerald-400 flex items-center gap-1 text-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      Active Production Webhook
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
