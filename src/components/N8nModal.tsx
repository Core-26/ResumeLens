import React, { useState } from 'react';
import { X, ExternalLink, Copy, Check, Server, Shield, Activity, RefreshCw } from 'lucide-react';

interface N8nModalProps {
  isOpen: boolean;
  onClose: () => void;
  n8nStatus: { reachable: boolean; latencyMs?: number; statusCode?: number };
  onRefreshStatus: () => void;
}

export const N8nModal: React.FC<N8nModalProps> = ({
  isOpen,
  onClose,
  n8nStatus,
  onRefreshStatus,
}) => {
  const [copied, setCopied] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  if (!isOpen) return null;

  const n8nUrl = 'https://deepika16.app.n8n.cloud/form/2ad2e081-6188-434e-8e00-e17469316afb';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(n8nUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await onRefreshStatus();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-950/90 border border-cyan-800/80 flex items-center justify-center text-cyan-400">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">n8n Cloud Webhook Gateway</h3>
              <p className="text-xs text-slate-400">Deepika Production Workflow Integration</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Status Indicator */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className={`w-3 h-3 rounded-full ${n8nStatus.reachable ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`} />
            <div>
              <div className="text-xs font-semibold text-white">
                {n8nStatus.reachable ? 'Webhook Responding (Active)' : 'Connection Offline'}
              </div>
              <div className="text-[11px] text-slate-400">
                Cloudflare Origin · SSL Encrypted
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin text-cyan-400' : ''}`} />
            <span>Check Status</span>
          </button>
        </div>

        {/* URL Box */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-300">
            Target n8n Form Webhook URL
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={n8nUrl}
              className="flex-1 rounded-lg bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-xs font-mono text-cyan-300 selection:bg-cyan-500/20"
            />
            <button
              type="button"
              onClick={copyToClipboard}
              className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Copy URL"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
            <a
              href={n8nUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors cursor-pointer"
              title="Open Form directly in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Form Schema Details */}
        <div className="space-y-2">
          <div className="text-xs font-semibold text-slate-300">
            Automated Form Payload Contract
          </div>
          <div className="rounded-lg bg-slate-950 border border-slate-800 p-3.5 space-y-2 text-xs font-mono text-slate-300">
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-800/80">
              <span className="text-cyan-400">field-0</span>
              <span className="text-slate-400">text (Candidate Name)</span>
              <span className="text-emerald-400 text-[10px]">Required</span>
            </div>
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-800/80">
              <span className="text-cyan-400">field-1</span>
              <span className="text-slate-400">email (Candidate Email)</span>
              <span className="text-emerald-400 text-[10px]">Required</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-cyan-400">field-2</span>
              <span className="text-slate-400">file (Resume PDF/DOCX/TXT)</span>
              <span className="text-emerald-400 text-[10px]">Required</span>
            </div>
          </div>
        </div>

        {/* Technical Architecture Note */}
        <div className="text-xs text-slate-400 leading-relaxed bg-slate-950/40 p-3.5 rounded-lg border border-slate-800/80">
          <strong className="text-slate-300">Architecture Note:</strong> The native n8n form sets <code className="text-slate-300 font-mono">X-Frame-Options: SAMEORIGIN</code> to prevent malicious clickjacking in third-party iframes. This web app proxies submissions via our full-stack backend endpoint <code className="text-cyan-400 font-mono">/api/submit-resume</code>, streaming file payloads safely without CORS hurdles while preserving full end-to-end encryption.
        </div>

        {/* Modal Action Buttons */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
          <a
            href={n8nUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors cursor-pointer"
          >
            <span>Open in n8n Cloud</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </div>
  );
};
