import React from 'react';
import { ExternalLink, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenN8nModal: () => void;
  onOpenDirectLink: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenN8nModal, onOpenDirectLink }) => {
  return (
    <footer className="border-t border-slate-800/80 bg-[#0b0f17] py-12 text-xs text-slate-500">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand & Note */}
          <div className="space-y-1 text-center md:text-left">
            <div className="text-sm font-bold text-white tracking-tight">
              ResumeLens
            </div>
            <p className="text-slate-400">
              Automated Resume Analysis & ATS Diagnostic Portal powered by Deepika n8n Cloud.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400">
            <button
              onClick={onOpenN8nModal}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Webhook Config
            </button>
            <button
              onClick={onOpenDirectLink}
              className="inline-flex items-center gap-1 hover:text-cyan-400 transition-colors cursor-pointer"
            >
              <span>Native n8n Form</span>
              <ExternalLink className="w-3 h-3" />
            </button>
            <a 
              href="#capabilities" 
              className="hover:text-cyan-400 transition-colors"
            >
              Evaluation Protocols
            </a>
            <a 
              href="#faq" 
              className="hover:text-cyan-400 transition-colors"
            >
              Privacy & Retention
            </a>
          </div>

        </div>

        {/* Bottom Rule */}
        <div className="mt-8 pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-600">
          <div>
            © {new Date().getFullYear()} ResumeLens · Integrated with n8n Cloud Automation
          </div>
          <div className="flex items-center gap-1.5 text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
            <span>256-bit SSL In-Transit Encryption</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
