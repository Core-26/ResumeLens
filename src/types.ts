export interface SubmissionState {
  status: 'idle' | 'preparing' | 'uploading' | 'processing' | 'success' | 'error';
  errorMessage?: string;
  responseDetails?: any;
  timestamp?: string;
  submissionId?: string;
}

export interface CandidateForm {
  name: string;
  email: string;
  targetRole: string;
  file: File | null;
}

export interface PreAuditReport {
  score: number;
  wordCount: number;
  readabilityScore: number;
  actionVerbsCount: number;
  quantifiedMetricsCount: number;
  sectionsDetected: string[];
  missingCrucials: string[];
  keyStrengths: string[];
  recommendations: string[];
}

export interface SampleProfile {
  id: string;
  role: string;
  level: string;
  overallScore: number;
  breakdown: {
    atsParsing: number;
    quantification: number;
    keywordDensity: number;
    brevity: number;
  };
  beforeBullet: string;
  afterBullet: string;
  critique: string;
  keywords: string[];
}
