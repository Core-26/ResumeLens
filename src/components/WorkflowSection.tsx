import React, { useState } from 'react';
import { 
  Network, 
  Cpu, 
  Send, 
  CheckCircle, 
  ArrowRight, 
  ExternalLink, 
  RefreshCw, 
  Layers, 
  Server
} from 'lucide-react';
import previewImg from '../assets/images/analytics_workflow_preview_1790759670513.jpg';

interface WorkflowSectionProps {
  onOpenDirectLink: () => void;
  n8nStatus: { reachable: boolean; latencyMs?: number; statusCode?: number };
  onRefreshStatus: () => void;
}

export const WorkflowSection: React.FC<WorkflowSectionProps> = ({
  onOpenDirectLink,
  n8nStatus,
  onRefreshStatus,
}) => {
  const [isPinging, setIsPinging] = useState(false);

  const handlePing = async () => {
    setIsPinging(true);
    await onRefreshStatus();
    setTimeout(() => setIsPinging(false), 500);
  };

  const steps = [
    {
      num: '01',
      title: 'Form Webhook Trigger',
      desc: 'Incoming multipart POST with candidate Name (field-0), Email (field-1), and File (field-2).',
      subtext: 'deepika16.app.n8n.cloud/form/...',
    },
    {
      num: '02',
      title: 'Binary Ingestion & Tokenizer',
      desc: 'Converts PDF/DOCX binary streams into sanitized structural markdown blocks with metadata tags.',
      subtext: 'Lossless text stream extraction',
    },
    {
      num: '03',
      title: 'Evaluation Matrix',
      desc: 'Cross-checks semantic keywords, quantifiers, action verbs, and ATS heading invariants.',
      subtext: 'Heuristic & LLM scoring nodes',
    },
    {
      num: '04',
      title: 'Synthesis & Dispatch',
      desc: 'Compiles the quantitative audit report and dispatches executive findings directly to candidate email.',
      subtext: 'Automated SMTP / Webhook delivery',
    },
  ];

  return (
    <section id="pipeline" className="py-20 border-t border-slate-800/80 bg-slate-950/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header & Status Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">
              Architecture & Transparency
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Powered by Deepika's Cloud n8n Pipeline.
            </h2>
            <p className="mt-3 text-base text-slate-300">
              Each submission directly executes an automated production workflow hosted on n8n Cloud, ensuring consistent, reproducible document parsing without manual intervention.
            </p>
          </div>

          {/* Webhook Connectivity Widget */}
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/80 flex items-center justify-between gap-6 self-start lg:self-auto min-w-[320px]">
            <div>
              <div className="text-[11px] text-slate-400 uppercase tracking-wide">
                n8n Cloud Target
              </div>
              <div className="text-xs font-mono text-cyan-400 truncate max-w-[200px]">
                deepika16.app.n8n.cloud
              </div>
              <div className="flex items-center gap-1.5 mt-1 text-[11px]">
                <span className={`w-2 h-2 rounded-full ${n8nStatus.reachable ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`} />
                <span className={n8nStatus.reachable ? 'text-emerald-400' : 'text-rose-400'}>
                  {n8nStatus.reachable ? 'Endpoint Live (200 OK)' : 'Endpoint Unreachable'}
                </span>
                {n8nStatus.latencyMs && (
                  <span className="text-slate-500 font-mono">({n8nStatus.latencyMs}ms)</span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePing}
                disabled={isPinging}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Ping n8n Cloud Webhook"
              >
                <RefreshCw className={`w-4 h-4 ${isPinging ? 'animate-spin text-cyan-400' : ''}`} />
              </button>

              <button
                type="button"
                onClick={onOpenDirectLink}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Open native n8n form in new tab"
              >
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Workflow Graphic and Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Visual Asset */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-xl">
              <div className="aspect-[4/3] w-full bg-slate-900 overflow-hidden">
                <img
                  src={previewImg}
                  alt="n8n automated workflow execution node overview"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <div className="p-4 bg-slate-900/90 border-t border-slate-800">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span className="flex items-center gap-2">
                    <Server className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Workflow UUID: 2ad2e081-6188...</span>
                  </span>
                  <span className="font-mono text-emerald-400">Node Execution: Instant</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sequential Steps List */}
          <div className="lg:col-span-7 space-y-4">
            {steps.map((step) => (
              <div
                key={step.num}
                className="p-5 rounded-xl border border-slate-800 bg-[#0f172a]/60 hover:bg-[#0f172a] hover:border-slate-700 transition-all flex items-start gap-4"
              >
                <div className="text-base font-mono font-bold text-cyan-400 pt-0.5 shrink-0">
                  {step.num}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-white">
                      {step.title}
                    </h3>
                    <span className="text-[11px] font-mono text-slate-500">
                      {step.subtext}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
