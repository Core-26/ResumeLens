import React, { useState } from 'react';
import { Check, X, ArrowRight, BarChart2 } from 'lucide-react';
import { SampleProfile } from '../types';

export const BenchmarkSection: React.FC = () => {
  const benchmarks: SampleProfile[] = [
    {
      id: 'swe',
      role: 'Staff / Principal Software Engineer',
      level: 'Senior & Staff Tier',
      overallScore: 92,
      breakdown: {
        atsParsing: 98,
        quantification: 89,
        keywordDensity: 94,
        brevity: 87,
      },
      beforeBullet: 'Responsible for maintaining the backend microservices, fixing bug tickets, and participating in weekly team standup meetings.',
      afterBullet: 'Architected event-driven microservices processing 1.4B messages/day, reducing p99 latency from 320ms to 45ms and saving $210K/yr in AWS egress costs.',
      critique: 'Replaced passive maintenance language with architectural scope, throughput scale, quantified latency improvement, and dollar savings.',
      keywords: ['Distributed Systems', 'Kafka', 'Latency Optimization', 'AWS Architecture', 'Microservices'],
    },
    {
      id: 'pm',
      role: 'Director of Product Management',
      level: 'Executive Tier',
      overallScore: 94,
      breakdown: {
        atsParsing: 95,
        quantification: 96,
        keywordDensity: 92,
        brevity: 93,
      },
      beforeBullet: 'Worked with engineering and design to launch the new mobile onboarding flow for our subscription app.',
      afterBullet: 'Spearheaded zero-friction checkout redesign across iOS and Android, elevating trial-to-paid conversion from 4.2% to 7.8% and unlocking $3.4M in ARR.',
      critique: 'Quantified conversion lift and direct ARR contribution while clarifying cross-functional leadership authority.',
      keywords: ['ARR Growth', 'Trial-to-Paid', 'Funnel Optimization', 'Product Roadmap', 'Cross-Functional Leadership'],
    },
    {
      id: 'ds',
      role: 'Lead Machine Learning Engineer',
      level: 'Specialist Tier',
      overallScore: 91,
      breakdown: {
        atsParsing: 92,
        quantification: 90,
        keywordDensity: 95,
        brevity: 88,
      },
      beforeBullet: 'Built machine learning recommendation models using Python and PyTorch for our e-commerce catalog.',
      afterBullet: 'Trained and deployed dual-encoder vector search model on 12M SKUs, boosting search click-through rate (CTR) by 31% and gross merchandise value (GMV) by $1.2M/mo.',
      critique: 'Introduced precise architectural terminology (dual-encoder vector search) with measurable business uplift (CTR and GMV).',
      keywords: ['Vector Search', 'PyTorch', 'Model Serving', 'CTR Lift', 'Embedding Quantization'],
    },
    {
      id: 'growth',
      role: 'VP of Growth & Performance Marketing',
      level: 'Executive Tier',
      overallScore: 89,
      breakdown: {
        atsParsing: 94,
        quantification: 91,
        keywordDensity: 86,
        brevity: 85,
      },
      beforeBullet: 'Managed paid ads budget on Google and Meta and managed agency contracts for SEO initiatives.',
      afterBullet: 'Directed $4.5M annual performance marketing budget across search and social, slashing Customer Acquisition Cost (CAC) by 26% while scaling blended ROAS to 4.2x.',
      critique: 'Replaced operational chore listing with portfolio scale, CAC deflation, and strict ROAS profitability benchmarks.',
      keywords: ['CAC Optimization', 'ROAS Scaling', 'Performance Marketing', 'Budget Stewardship', 'Paid Acquisition'],
    },
  ];

  const [selectedId, setSelectedId] = useState<string>('swe');
  const activeProfile = benchmarks.find((b) => b.id === selectedId) || benchmarks[0];

  return (
    <section id="benchmarks" className="py-20 border-t border-slate-800/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">
            Audit Benchmark Laboratory
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Before & After Resume Transformations.
          </h2>
          <p className="mt-3 text-base text-slate-300">
            See how the n8n analysis engine restructures candidate descriptions to pass recruiter filters and executive screens.
          </p>
        </div>

        {/* Interactive Segmented Control Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl mb-8 max-w-fit">
          {benchmarks.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                selectedId === item.id
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {item.role.split(' ')[0]} {item.role.split(' ')[1]}
            </button>
          ))}
        </div>

        {/* Active Profile Card */}
        <div className="rounded-2xl border border-slate-800 bg-[#0f172a]/90 p-6 sm:p-10 space-y-8">
          
          {/* Header of Active Benchmark */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
            <div>
              <div className="text-xs text-cyan-400 font-mono mb-1">{activeProfile.level}</div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {activeProfile.role}
              </h3>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-2xl font-bold font-mono text-cyan-400 tabular-nums">
                  {activeProfile.overallScore}
                  <span className="text-sm font-normal text-slate-500">/100</span>
                </div>
                <div className="text-xs text-slate-400">Post-Audit Score</div>
              </div>
            </div>
          </div>

          {/* Quantitative Breakdown Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-xs text-slate-400">ATS Parsing Reliability</div>
              <div className="text-xl font-bold font-mono text-white mt-1 tabular-nums">
                {activeProfile.breakdown.atsParsing}%
              </div>
              <div className="w-full bg-slate-800 h-1 rounded-full mt-2">
                <div 
                  className="bg-emerald-400 h-full rounded-full" 
                  style={{ width: `${activeProfile.breakdown.atsParsing}%` }} 
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-xs text-slate-400">Impact Quantification</div>
              <div className="text-xl font-bold font-mono text-white mt-1 tabular-nums">
                {activeProfile.breakdown.quantification}%
              </div>
              <div className="w-full bg-slate-800 h-1 rounded-full mt-2">
                <div 
                  className="bg-cyan-400 h-full rounded-full" 
                  style={{ width: `${activeProfile.breakdown.quantification}%` }} 
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-xs text-slate-400">Target Keyword Match</div>
              <div className="text-xl font-bold font-mono text-white mt-1 tabular-nums">
                {activeProfile.breakdown.keywordDensity}%
              </div>
              <div className="w-full bg-slate-800 h-1 rounded-full mt-2">
                <div 
                  className="bg-blue-400 h-full rounded-full" 
                  style={{ width: `${activeProfile.breakdown.keywordDensity}%` }} 
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-xs text-slate-400">Brevity & Skimmability</div>
              <div className="text-xl font-bold font-mono text-white mt-1 tabular-nums">
                {activeProfile.breakdown.brevity}%
              </div>
              <div className="w-full bg-slate-800 h-1 rounded-full mt-2">
                <div 
                  className="bg-purple-400 h-full rounded-full" 
                  style={{ width: `${activeProfile.breakdown.brevity}%` }} 
                />
              </div>
            </div>
          </div>

          {/* Side-by-Side Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            
            {/* Weak Example */}
            <div className="p-6 rounded-xl bg-rose-950/20 border border-rose-900/40 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-rose-400 uppercase tracking-wider">
                <X className="w-4 h-4" />
                <span>Pre-Audit (Weak / Rejected by ATS)</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed font-mono text-xs bg-slate-950/60 p-3.5 rounded-lg border border-rose-950">
                "{activeProfile.beforeBullet}"
              </p>
              <div className="text-xs text-rose-300/80">
                Lacks quantified proof, reads as an operational duty rather than an achievement.
              </div>
            </div>

            {/* Optimized Example */}
            <div className="p-6 rounded-xl bg-emerald-950/20 border border-emerald-900/40 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                <Check className="w-4 h-4" />
                <span>Post-Audit (n8n Cloud Optimized)</span>
              </div>
              <p className="text-sm text-slate-100 leading-relaxed font-mono text-xs bg-slate-950/80 p-3.5 rounded-lg border border-emerald-950">
                "{activeProfile.afterBullet}"
              </p>
              <div className="text-xs text-emerald-300/90">
                {activeProfile.critique}
              </div>
            </div>

          </div>

          {/* Injected Keywords Unboxed */}
          <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <span className="text-slate-300 font-semibold">Matched Core Tokens:</span>
            {activeProfile.keywords.map((kw, i) => (
              <React.Fragment key={kw}>
                <span className="font-mono text-cyan-300">{kw}</span>
                {i < activeProfile.keywords.length - 1 && (
                  <span aria-hidden="true" className="text-slate-700">·</span>
                )}
              </React.Fragment>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
