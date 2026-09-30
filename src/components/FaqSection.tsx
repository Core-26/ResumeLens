import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const faqs = [
    {
      q: 'How does the n8n integration work with this application?',
      a: 'This website connects directly to Deepika’s live n8n workflow at deepika16.app.n8n.cloud/form/2ad2e081-6188-434e-8e00-e17469316afb. Submissions are transmitted via a secure full-stack proxy as multipart/form-data adhering exactly to the n8n schema: field-0 (Candidate Name), field-1 (Candidate Email), and field-2 (Resume File).',
    },
    {
      q: 'What formats are supported for resume uploads?',
      a: 'We support PDF, DOCX, Microsoft Word (.doc), and plain text (.txt) documents up to 25MB. Text-based PDFs with native fonts yield the highest ATS parsing accuracy.',
    },
    {
      q: 'How long does the automated resume evaluation take?',
      a: 'Submissions are received immediately by the n8n webhook (average latency under 150ms). Document parsing, tokenization, and report generation take between 30 to 60 seconds, after which the executive scorecard is dispatched to your email.',
    },
    {
      q: 'Is my resume and personal data secure?',
      a: 'Yes. All uploads are processed in-memory and passed over HTTPS directly to the n8n cloud instance. Resumes are not sold, shared, or retained beyond the execution cycle.',
    },
    {
      q: 'What is ATS parsing and why does formatting matter?',
      a: 'Applicant Tracking Systems (ATS) like Workday, Greenhouse, and Lever convert uploaded resumes into plain text before recruiters see them. Complex multi-column tables, text boxes, and unusual fonts often result in scrambled text or missed keywords.',
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 border-t border-slate-800/80 bg-slate-950/20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">
            Technical FAQs
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm text-slate-300">
            Everything you need to know about the automated n8n pipeline and scoring heuristics.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-slate-800 bg-[#0f172a]/70 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer focus:outline-none"
                >
                  <span className="text-sm sm:text-base font-semibold text-white">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ml-4 ${
                      isOpen ? 'transform rotate-180 text-cyan-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-sm text-slate-300 leading-relaxed border-t border-slate-800/60">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
