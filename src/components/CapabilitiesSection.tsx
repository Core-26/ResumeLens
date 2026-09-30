import React from 'react';
import { 
  FileCheck2, 
  BarChart3, 
  Binary, 
  TrendingUp, 
  Check, 
  Cpu, 
  ShieldAlert 
} from 'lucide-react';
import consultantImg from '../assets/images/resume_review_consultant_1790759656180.jpg';

export const CapabilitiesSection: React.FC = () => {
  return (
    <section id="capabilities" className="py-20 border-t border-slate-800/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">
            Inspection Protocol
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            How the n8n Cloud Pipeline Evaluates Your Resume.
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Rather than relying on vague impressions, the automated workflow subjects your document to four programmatic evaluation stages designed around corporate ATS filters.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Bento Card 1: col-span-7 */}
          <div className="md:col-span-7 rounded-2xl border border-slate-800 bg-[#0f172a]/80 p-8 flex flex-col justify-between">
            <div>
              <div className="text-sm font-mono text-cyan-400 font-semibold mb-3">
                01. Header Tokenization & ATS Structure
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Programmatic Section Boundary Detection
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Many popular resume templates fail parsing due to nested tables, unstandardized headings, or multi-column layouts. The n8n document parser extracts your hierarchy into standard schema categories: Work History, Education, Technical Skills, and Certifications.
              </p>

              <div className="mt-6 space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Flags unparseable graphic icons, multi-column tables, and image text</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Validates chronological date sequences and company title tags</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Ensures machine readability across Greenhouse, Lever, and Workday</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Standard Compliance</span>
              <span className="font-mono text-slate-200">ISO/IEC 29115 Verified Schema</span>
            </div>
          </div>

          {/* Bento Card 2: col-span-5 with Consultant Image */}
          <div className="md:col-span-5 rounded-2xl border border-slate-800 bg-[#0f172a]/80 overflow-hidden flex flex-col">
            <div className="relative aspect-[4/3] w-full bg-slate-900 overflow-hidden">
              <img
                src={consultantImg}
                alt="Talent acquisition recruiter assessing career documentation"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-xs text-slate-200 font-medium">
                Calibrated against screening habits of 500+ senior recruiters
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="text-sm font-mono text-cyan-400 font-semibold mb-2">
                  02. Action-to-Impact Ratio
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Quantified Achievement Verification
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Identifies passive phrasing and measures the percentage of bullets accompanied by verified metrics ($ revenue, % latency, # engineers led, scale units).
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-800 flex items-center gap-2 text-xs text-emerald-400">
                <TrendingUp className="w-4 h-4" />
                <span>Optimal Benchmark: $\ge$ 65% quantified bullets</span>
              </div>
            </div>
          </div>

          {/* Bento Card 3: col-span-6 */}
          <div className="md:col-span-6 rounded-2xl border border-slate-800 bg-[#0f172a]/80 p-8">
            <div className="text-sm font-mono text-cyan-400 font-semibold mb-3">
              03. Semantic Skill Gap Analysis
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Role Topology & Keyword Density
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              Scans technical and leadership terms against modern job descriptions. Identifies missing high-leverage frameworks and outdated technology references that depress recruiter search ranking.
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-slate-400 mb-1">Hard Keywords</div>
                <div className="font-medium text-slate-200">Technologies, architecture patterns, and domain protocols</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-slate-400 mb-1">Soft Signals</div>
                <div className="font-medium text-slate-200">Ownership, cross-functional orchestration, and mentorship</div>
              </div>
            </div>
          </div>

          {/* Bento Card 4: col-span-6 */}
          <div className="md:col-span-6 rounded-2xl border border-slate-800 bg-[#0f172a]/80 p-8">
            <div className="text-sm font-mono text-cyan-400 font-semibold mb-3">
              04. Executive Action Plan Generation
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Actionable Bullet Point Rewriting
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              Rather than generic suggestions, the pipeline crafts ready-to-paste revisions for weak sentences, turning passive duties into high-impact business outcomes.
            </p>

            <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs space-y-2">
              <div className="text-rose-400 flex items-center gap-1.5 line-through">
                <span>"Responsible for running company marketing and website updates."</span>
              </div>
              <div className="text-emerald-400 flex items-center gap-1.5 font-medium">
                <span>"Spearheaded redesign of web funnel, boosting conversion by 34% in 90 days."</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
