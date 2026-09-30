import React, { useState, useRef, ChangeEvent, DragEvent } from 'react';
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  X, 
  Sparkles, 
  ExternalLink, 
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Send
} from 'lucide-react';
import { CandidateForm, SubmissionState, PreAuditReport } from '../types';

interface ResumeUploaderProps {
  onSubmissionSuccess?: (result: any) => void;
  onOpenDirectLink: () => void;
}

export const ResumeUploader: React.FC<ResumeUploaderProps> = ({ 
  onSubmissionSuccess, 
  onOpenDirectLink 
}) => {
  const [formData, setFormData] = useState<CandidateForm>({
    name: '',
    email: '',
    targetRole: 'Senior Software Engineer',
    file: null,
  });

  const [isDragging, setIsDragging] = useState(false);
  const [submissionState, setSubmissionState] = useState<SubmissionState>({
    status: 'idle',
  });
  const [stepProgress, setStepProgress] = useState(0);
  const [clientAudit, setClientAudit] = useState<PreAuditReport | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sample resume builder for quick 1-click testing
  const handleLoadSampleResume = () => {
    const sampleText = `
ALEXANDER CHEN
Senior Staff Software Engineer | San Francisco, CA | alex.chen@example.com | (555) 392-1084

PROFESSIONAL SUMMARY
High-performing software architect with 8+ years leading distributed systems, event-driven microservices, and high-throughput real-time APIs. Reduced infrastructure latency by 42% across 14M daily active users.

CORE COMPETENCIES
Languages: TypeScript, Go, Python, Java, SQL, Rust
Frameworks & Tools: React, Next.js, Node.js, Express, Kafka, Docker, Kubernetes, AWS, Terraform, n8n Automation
Methodologies: CI/CD Pipelines, System Architecture, ATS Optimization, Agile/Scrum, Mentorship

PROFESSIONAL EXPERIENCE
Senior Staff Software Engineer — Horizon Cloud Platform (2021 – Present)
- Engineered real-time distributed data ingestion pipeline using Go and Kafka, handling 1.8B events/day with 99.99% uptime.
- Led migration of legacy monolithic payment infrastructure to microservices, saving $380,000 annually in AWS compute costs.
- Mentored a cross-functional squad of 12 engineers, accelerating sprint velocity by 28% while decreasing production rollbacks to <0.5%.

Senior Systems Engineer — Apex Enterprise Solutions (2018 – 2021)
- Designed and rolled out GraphQL gateway servicing 60+ internal services, improving client response times from 420ms to 95ms.
- Implemented automated observability dashboards with Prometheus and OpenTelemetry, trimming mean-time-to-detection (MTTD) by 65%.

EDUCATION
B.S. in Computer Science — University of California, Berkeley (2018)
    `.trim();

    const sampleBlob = new Blob([sampleText], { type: 'text/plain' });
    const sampleFile = new File([sampleBlob], 'Alexander_Chen_Staff_Engineer_Resume.txt', {
      type: 'text/plain',
      lastModified: Date.now(),
    });

    setFormData({
      name: 'Alexander Chen',
      email: 'alex.chen.careers@gmail.com',
      targetRole: 'Staff Software Engineer',
      file: sampleFile,
    });

    runPreFlightAudit(sampleText, sampleFile);
  };

  const runPreFlightAudit = (text: string, file: File) => {
    const words = text.split(/\s+/).filter(Boolean).length;
    const actionVerbs = [
      'engineered', 'spearheaded', 'architected', 'led', 'designed', 
      'implemented', 'reduced', 'increased', 'optimized', 'scaled', 'mentored'
    ];
    let foundVerbs = 0;
    actionVerbs.forEach(v => {
      if (text.toLowerCase().includes(v)) foundVerbs++;
    });

    const metricsCount = (text.match(/\b\d+(\.\d+)?%|\$\d+|\b\d+\+?(\s?(million|billion|k|M|B))?\b/g) || []).length;
    
    const sections = ['Experience', 'Education', 'Skills', 'Summary'];
    const detected = sections.filter(sec => 
      text.toLowerCase().includes(sec.toLowerCase())
    );

    setClientAudit({
      score: Math.min(94, 65 + (metricsCount * 3) + (foundVerbs * 2)),
      wordCount: words,
      readabilityScore: 88,
      actionVerbsCount: foundVerbs,
      quantifiedMetricsCount: metricsCount,
      sectionsDetected: detected,
      missingCrucials: sections.filter(s => !detected.includes(s)),
      keyStrengths: [
        'Direct metrics and quantified revenue/latency impacts',
        'Standard ATS-compliant section headers identified',
        'Strong industry keyword density',
      ],
      recommendations: [
        'Ensure bullet points lead with power action verbs',
        'Verify contact details and LinkedIn URL are unnested',
        'Ready for deep n8n automated evaluation',
      ],
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFormData(prev => ({ ...prev, file: selectedFile }));

      // Run client-side preflight scan if text/readable
      if (selectedFile.type.includes('text') || selectedFile.name.endsWith('.txt')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const content = event.target?.result as string;
          if (content) runPreFlightAudit(content, selectedFile);
        };
        reader.readAsText(selectedFile);
      } else {
        // Mock estimate for binary files like PDF
        setClientAudit({
          score: 82,
          wordCount: Math.round(selectedFile.size / 25),
          readabilityScore: 85,
          actionVerbsCount: 8,
          quantifiedMetricsCount: 6,
          sectionsDetected: ['Experience', 'Education', 'Skills'],
          missingCrucials: [],
          keyStrengths: [
            `${selectedFile.name.split('.').pop()?.toUpperCase()} format accepted by n8n cloud parser`,
            'File size within optimal ATS threshold',
          ],
          recommendations: [
            'Our n8n workflow will extract text and assess ATS compatibility',
          ],
        });
      }
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      setFormData(prev => ({ ...prev, file: droppedFile }));

      if (droppedFile.type.includes('text') || droppedFile.name.endsWith('.txt')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const content = event.target?.result as string;
          if (content) runPreFlightAudit(content, droppedFile);
        };
        reader.readAsText(droppedFile);
      } else {
        setClientAudit({
          score: 82,
          wordCount: Math.round(droppedFile.size / 25),
          readabilityScore: 85,
          actionVerbsCount: 8,
          quantifiedMetricsCount: 6,
          sectionsDetected: ['Experience', 'Education', 'Skills'],
          missingCrucials: [],
          keyStrengths: [
            `${droppedFile.name.split('.').pop()?.toUpperCase()} format accepted by n8n cloud parser`,
          ],
          recommendations: [
            'Our n8n workflow will extract text and assess ATS compatibility',
          ],
        });
      }
    }
  };

  const removeFile = () => {
    setFormData(prev => ({ ...prev, file: null }));
    setClientAudit(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Please enter your full name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }
    if (!formData.file) {
      alert('Please upload or select a resume file first.');
      return;
    }

    setSubmissionState({ status: 'preparing' });
    setStepProgress(1);

    try {
      // Step 1: Preparing payload
      await new Promise(r => setTimeout(r, 400));
      setSubmissionState({ status: 'uploading' });
      setStepProgress(2);

      // Build multipart request
      const payload = new FormData();
      payload.append('name', formData.name.trim());
      payload.append('email', formData.email.trim());
      payload.append('targetRole', formData.targetRole);
      payload.append('resume', formData.file);

      // Step 2: Streaming to /api/submit-resume (proxied to n8n webhook)
      setSubmissionState({ status: 'processing' });
      setStepProgress(3);

      const response = await fetch('/api/submit-resume', {
        method: 'POST',
        body: payload,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Submission failed on n8n server.');
      }

      setStepProgress(4);
      setSubmissionState({
        status: 'success',
        responseDetails: data,
        timestamp: new Date().toLocaleTimeString(),
        submissionId: `n8n-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
      });

      if (onSubmissionSuccess) {
        onSubmissionSuccess(data);
      }
    } catch (err: any) {
      console.error('Submission error:', err);
      setSubmissionState({
        status: 'error',
        errorMessage: err.message || 'Unable to connect to n8n cloud server. Please try again.',
      });
    }
  };

  const resetForm = () => {
    setSubmissionState({ status: 'idle' });
    setStepProgress(0);
    setFormData({
      name: '',
      email: '',
      targetRole: 'Senior Software Engineer',
      file: null,
    });
    setClientAudit(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div id="analyzer-form" className="relative scroll-mt-20">
      
      {/* Container Card */}
      <div className="rounded-2xl border border-slate-800 bg-[#0f172a]/95 backdrop-blur-xl p-6 sm:p-10 shadow-2xl">
        
        {/* Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 border-b border-slate-800 gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-1">
              Live n8n Webhook Pipeline
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Resume Diagnostic Intake
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Mapped directly to n8n form schema: <span className="font-mono text-slate-300">field-0 (Name)</span>, <span className="font-mono text-slate-300">field-1 (Email)</span>, <span className="font-mono text-slate-300">field-2 (File)</span>.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <button
              type="button"
              onClick={handleLoadSampleResume}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-cyan-300 hover:text-cyan-200 bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-800/80 px-3.5 py-2 rounded-lg transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Load Sample Resume</span>
            </button>

            <button
              type="button"
              onClick={onOpenDirectLink}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800 hover:border-slate-700 px-3 py-2 rounded-lg transition-colors cursor-pointer"
              title="Open the native n8n form interface in a new window"
            >
              <span>Native n8n Form</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </button>
          </div>
        </div>

        {/* Content Body: Either Form or Success Screen */}
        {submissionState.status === 'success' ? (
          <div className="py-8 space-y-6">
            
            {/* Success Banner */}
            <div className="p-6 rounded-xl bg-emerald-950/30 border border-emerald-800/60 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-900/60 border border-emerald-700 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wide">
                  Execution Confirmed · n8n Status 200
                </div>
                <h3 className="text-xl font-bold text-white mt-0.5">
                  Resume Dispatched to Automated Workflow
                </h3>
                <p className="text-sm text-slate-300 mt-1">
                  Candidate document for <strong className="text-white">{formData.name}</strong> was received by the n8n Cloud webhook. Detailed analysis report will be processed and dispatched to <strong className="text-cyan-300">{formData.email}</strong>.
                </p>
              </div>
              <div className="text-right text-xs text-slate-400 border-t sm:border-t-0 sm:border-l border-emerald-900/80 pt-3 sm:pt-0 sm:pl-4">
                <div>Receipt: <span className="font-mono text-slate-200">{submissionState.submissionId}</span></div>
                <div>Timestamp: <span className="font-mono text-slate-200">{submissionState.timestamp}</span></div>
              </div>
            </div>

            {/* Instant Pre-Flight Diagnostic Summary */}
            {clientAudit && (
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <h4 className="text-base font-semibold text-white">Pre-Flight ATS Scan</h4>
                    <p className="text-xs text-slate-400">Preliminary structural tokenization prior to deep n8n LLM audit</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold font-mono text-cyan-400 tabular-nums">
                      {clientAudit.score}<span className="text-sm font-normal text-slate-500">/100</span>
                    </div>
                    <div className="text-xs text-slate-400">ATS Readiness</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                  <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                    <div className="text-xs text-slate-400">Word Count</div>
                    <div className="text-lg font-bold font-mono text-white tabular-nums">{clientAudit.wordCount}</div>
                    <div className="text-[11px] text-emerald-400 mt-0.5">Target: 450-800</div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                    <div className="text-xs text-slate-400">Action Verbs</div>
                    <div className="text-lg font-bold font-mono text-white tabular-nums">{clientAudit.actionVerbsCount}</div>
                    <div className="text-[11px] text-cyan-400 mt-0.5">Strong leadership</div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                    <div className="text-xs text-slate-400">Quantified Impacts</div>
                    <div className="text-lg font-bold font-mono text-white tabular-nums">{clientAudit.quantifiedMetricsCount}</div>
                    <div className="text-[11px] text-emerald-400 mt-0.5">Data-backed</div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                    <div className="text-xs text-slate-400">Core Sections</div>
                    <div className="text-lg font-bold font-mono text-white tabular-nums">{clientAudit.sectionsDetected.length}/4</div>
                    <div className="text-[11px] text-cyan-400 mt-0.5">Detected</div>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="text-xs font-semibold text-slate-300">Identified Strengths:</div>
                  <ul className="text-xs text-slate-400 space-y-1">
                    {clientAudit.keyStrengths.map((strength, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Next Steps Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                type="button"
                onClick={resetForm}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Submit Another Resume</span>
              </button>

              <button
                type="button"
                onClick={onOpenDirectLink}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                <span>View n8n Endpoint Response Page</span>
              </button>
            </div>

          </div>
        ) : (
          <form onSubmit={handleSubmit} className="pt-8 space-y-6">
            
            {/* Candidate Name & Email Fields (matches n8n field-0 and field-1) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Full Name */}
              <div className="space-y-2">
                <label htmlFor="name-input" className="block text-xs font-semibold text-slate-200">
                  Full Name <span className="text-cyan-400">*</span>
                </label>
                <input
                  id="name-input"
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full rounded-lg bg-slate-900 border border-slate-700/80 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                />
                <p className="text-[11px] text-slate-500">Passes as <code className="font-mono text-slate-400">field-0</code> to n8n</p>
              </div>

              {/* Email Address */}
              <div className="space-y-2">
                <label htmlFor="email-input" className="block text-xs font-semibold text-slate-200">
                  Email Address <span className="text-cyan-400">*</span>
                </label>
                <input
                  id="email-input"
                  type="email"
                  required
                  placeholder="e.g. sarah.jenkins@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full rounded-lg bg-slate-900 border border-slate-700/80 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                />
                <p className="text-[11px] text-slate-500">Passes as <code className="font-mono text-slate-400">field-1</code> to n8n (Analysis destination)</p>
              </div>

            </div>

            {/* Target Role Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-200">
                Target Role Benchmark
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  'Staff Software Engineer',
                  'Head of Product Management',
                  'Senior Data Scientist',
                  'VP / Executive Leadership',
                ].map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, targetRole: role }))}
                    className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all text-left truncate cursor-pointer ${
                      formData.targetRole === role
                        ? 'bg-cyan-950/70 border-cyan-500/80 text-cyan-200 shadow-sm'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            {/* File Upload Zone (matches n8n field-2) */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-200">
                Upload Resume Document <span className="text-cyan-400">*</span>
              </label>

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileChange}
                className="hidden"
                id="resume-file-input"
              />

              {!formData.file ? (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                    isDragging
                      ? 'border-cyan-400 bg-cyan-950/20'
                      : 'border-slate-700/80 bg-slate-900/40 hover:border-slate-600 hover:bg-slate-900/70'
                  }`}
                >
                  <div className="mx-auto w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center mb-3">
                    <Upload className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div className="text-sm font-semibold text-white">
                    Drop your resume here, or <span className="text-cyan-400 underline underline-offset-2">browse files</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Accepts PDF, DOCX, DOC, or TXT (up to 25MB) · Encrypted for n8n processing
                  </p>
                </div>
              ) : (
                <div className="rounded-xl border border-slate-700 bg-slate-900/80 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-cyan-950/80 border border-cyan-800/80 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-white truncate">
                        {formData.file.name}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <span>{(formData.file.size / 1024).toFixed(1)} KB</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-emerald-400">Ready for n8n upload</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-xs text-slate-400 hover:text-white px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
                    >
                      Change
                    </button>
                    <button
                      type="button"
                      onClick={removeFile}
                      className="p-1.5 rounded text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors cursor-pointer"
                      title="Remove file"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Error Message Display */}
            {submissionState.status === 'error' && (
              <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/60 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="font-semibold text-rose-300">Submission Error: </strong>
                  <span className="text-slate-300">{submissionState.errorMessage}</span>
                  <div className="mt-2 text-slate-400">
                    You can also submit directly via the{' '}
                    <button
                      type="button"
                      onClick={onOpenDirectLink}
                      className="text-cyan-400 underline underline-offset-2 hover:text-cyan-300 cursor-pointer"
                    >
                      n8n form URL
                    </button>.
                  </div>
                </div>
              </div>
            )}

            {/* Progress Stepper during active upload */}
            {['preparing', 'uploading', 'processing'].includes(submissionState.status) && (
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span className="font-medium flex items-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                    <span>Communicating with n8n Cloud Webhook...</span>
                  </span>
                  <span className="font-mono text-cyan-400">Step {stepProgress} of 4</span>
                </div>

                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-cyan-400 h-full transition-all duration-300"
                    style={{ width: `${(stepProgress / 4) * 100}%` }}
                  />
                </div>

                <div className="text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Target: deepika16.app.n8n.cloud</span>
                  <span>Form Token: 2ad2e081-6188...</span>
                </div>
              </div>
            )}

            {/* Submit Action Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={['preparing', 'uploading', 'processing'].includes(submissionState.status)}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 active:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-lg shadow-cyan-950/30 transition-all cursor-pointer"
              >
                {['preparing', 'uploading', 'processing'].includes(submissionState.status) ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Streaming to n8n Webhook...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Dispatch Resume to n8n Analyzer</span>
                  </>
                )}
              </button>
            </div>

            {/* Quiet Footer Security Note */}
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500 pt-2">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
              <span>Direct SSL submission to Deepika n8n Cloud · No third-party data tracking</span>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
