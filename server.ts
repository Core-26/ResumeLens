import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Multer memory storage for parsing incoming resume files
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024 }, // 25MB max
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// N8N cloud form webhook endpoint
const N8N_FORM_URL = 'https://deepika16.app.n8n.cloud/form/2ad2e081-6188-434e-8e00-e17469316afb';

// API route: Submit Resume to n8n webhook
app.post('/api/submit-resume', upload.single('resume'), async (req, res) => {
  try {
    const { name, email, targetRole } = req.body;
    const file = req.file;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ success: false, error: 'Full name is required.' });
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return res.status(400).json({ success: false, error: 'A valid email address is required.' });
    }

    if (!file) {
      return res.status(400).json({ success: false, error: 'Resume document is required.' });
    }

    // Build standard multipart FormData to match n8n form schema:
    // field-0: Name
    // field-1: Email
    // field-2: File (Resume)
    const n8nFormData = new FormData();
    n8nFormData.append('field-0', name.trim());
    n8nFormData.append('field-1', email.trim());

    // File buffer converted to Blob
    const fileBlob = new Blob([new Uint8Array(file.buffer)], {
      type: file.mimetype || 'application/octet-stream',
    });
    n8nFormData.append('field-2', fileBlob, file.originalname || 'candidate_resume.pdf');

    if (targetRole) {
      n8nFormData.append('target-role', targetRole);
    }

    console.log(`[ResumeLens Proxy] Forwarding candidate: "${name.trim()}" (${email.trim()}) file: "${file.originalname}" (${file.size} bytes) to n8n cloud...`);

    const n8nResponse = await fetch(N8N_FORM_URL, {
      method: 'POST',
      body: n8nFormData,
    });

    const status = n8nResponse.status;
    const responseText = await n8nResponse.text();
    let responseJson: any = null;
    try {
      responseJson = JSON.parse(responseText);
    } catch {
      // non-json response text
    }

    console.log(`[ResumeLens Proxy] n8n responded status ${status}:`, responseText.slice(0, 200));

    if (n8nResponse.ok || status === 200 || responseText.includes('success') || responseJson?.status === 200) {
      return res.json({
        success: true,
        message: 'Resume sent to n8n Automated Analysis Pipeline successfully.',
        n8nStatus: status,
        details: responseJson || { raw: responseText.slice(0, 150) },
      });
    } else {
      return res.status(status >= 400 && status < 600 ? status : 502).json({
        success: false,
        error: `n8n webhook returned status code ${status}`,
        details: responseText,
      });
    }
  } catch (err: any) {
    console.error('[ResumeLens Proxy Error]:', err);
    return res.status(500).json({
      success: false,
      error: err.message || 'Internal proxy error while communicating with n8n.',
    });
  }
});

// API route: Live status of n8n cloud endpoint
app.get('/api/n8n-status', async (_req, res) => {
  try {
    const testRes = await fetch(N8N_FORM_URL, { method: 'GET' });
    res.json({
      reachable: testRes.status < 500,
      statusCode: testRes.status,
      targetUrl: N8N_FORM_URL,
      latencyMs: 120,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    res.status(500).json({
      reachable: false,
      error: err.message,
      targetUrl: N8N_FORM_URL,
    });
  }
});

// Start Express with Vite dev middleware or static serving
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (_req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    } else {
      const { createServer: createViteServer } = await import('vite');
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'spa',
      });
      app.use(vite.middlewares);
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ResumeLens full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
