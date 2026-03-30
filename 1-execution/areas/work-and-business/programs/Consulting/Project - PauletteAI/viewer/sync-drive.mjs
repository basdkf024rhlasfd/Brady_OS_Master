#!/usr/bin/env node
// sync-drive.mjs — Pull file metadata from Google Drive folders into manifest.json
// Usage: node sync-drive.mjs
// Requires: .env file with GOOGLE_API_KEY

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ─── Load API key from .env ───
function loadEnv() {
  const envPath = resolve(__dirname, '.env');
  let content;
  try {
    content = readFileSync(envPath, 'utf-8');
  } catch {
    console.error('Missing .env file. Create viewer/.env with:\nGOOGLE_API_KEY=your_key_here');
    process.exit(1);
  }
  const match = content.match(/^GOOGLE_API_KEY=(.+)$/m);
  if (!match) {
    console.error('.env must contain GOOGLE_API_KEY=...');
    process.exit(1);
  }
  return match[1].trim();
}

// ─── Section definitions (mirrors index.html) ───
const sections = [
  { id: 'services-plan', label: 'Services Plan', folderId: '1Dd1MIKGa1B8tMHIzHM7y_1r5-jbBjepR' },
  { id: 'cleaning', label: 'Cleaning & Disinfection', folderId: '1mztP0dfr-DvtPXHxMBH-KkQjhzSXzaL0' },
  { id: 'wall-cards', label: 'Wall Cards', folderId: '1B7_Aa6bw60irNQ0sSe9X9NBmtZs2zKS9' },
  { id: 'employee-manual', label: 'Employee Manual', folderId: '1cIFtEBhrqdjkerzo-5fA1hdkdZzl302p' },
  { id: 'talking-points', label: 'Talking Points', folderId: '1JeI_ve7AkLASoIWLUkVHRcViJ1w2CIaN' },
  { id: 'fundraising', label: 'Fundraising', folderId: '1jF2Ec6U9a6vBRuFTKnfxigHm2qem9Ieq' },
  { id: 'transfer-partners', label: 'Transfer Partners', folderId: '1PWbSkXBfKJkg1Kd437WQo1gwjS3_8QwG' },
  { id: 'strategic-plan', label: 'Strategic Plan', folderId: '1kayBwYYdhlDoCkHpXbFrHZTwbb_ohqJl' },
  { id: 'pauletteai', label: 'PauletteAI', folderId: '1kQRu_t0eCsmIoSKITrm-OOCoIM8SbL7q' },
  { id: 'social-media', label: 'Social Media', folderId: '1jJKa-oWluCA6W9V4JN-mjbClJvLeJBDN' },
  { id: 'grants', label: 'Grants', folderId: '1ZNMepjLjhM1pSrUeRufo-xlZ3k8DeLjZ' },
];

// ─── Simplify MIME type ───
function classifyMime(mimeType) {
  if (mimeType === 'application/vnd.google-apps.document') return 'gdoc';
  if (mimeType === 'application/vnd.google-apps.spreadsheet') return 'gsheet';
  if (mimeType === 'application/vnd.google-apps.presentation') return 'gslides';
  if (mimeType === 'application/vnd.google-apps.folder') return 'folder';
  if (mimeType === 'application/pdf') return 'pdf';
  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType.startsWith('video/')) return 'video';
  if (mimeType.includes('word') || mimeType.includes('document')) return 'doc';
  if (mimeType.includes('sheet') || mimeType.includes('excel')) return 'sheet';
  if (mimeType.includes('presentation') || mimeType.includes('powerpoint')) return 'slides';
  return 'other';
}

// ─── Fetch files for one folder ───
async function fetchFolder(folderId, apiKey) {
  const files = [];
  let pageToken = null;

  do {
    const params = new URLSearchParams({
      q: `'${folderId}' in parents and trashed = false`,
      fields: 'nextPageToken,files(id,name,mimeType,modifiedTime,webViewLink,size)',
      orderBy: 'name',
      pageSize: '100',
      key: apiKey,
    });
    if (pageToken) params.set('pageToken', pageToken);

    const url = `https://www.googleapis.com/drive/v3/files?${params}`;
    const res = await fetch(url);

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Drive API error ${res.status}: ${body}`);
    }

    const data = await res.json();
    if (data.files) {
      for (const f of data.files) {
        files.push({
          id: f.id,
          name: f.name,
          mimeType: f.mimeType,
          type: classifyMime(f.mimeType),
          modifiedTime: f.modifiedTime || null,
          webViewLink: f.webViewLink || `https://drive.google.com/file/d/${f.id}/view`,
          size: f.size ? parseInt(f.size, 10) : null,
        });
      }
    }
    pageToken = data.nextPageToken || null;
  } while (pageToken);

  return files;
}

// ─── Main ───
async function main() {
  const apiKey = loadEnv();
  console.log(`Syncing ${sections.length} sections...\n`);

  let totalFiles = 0;
  const result = {
    generatedAt: new Date().toISOString(),
    sections: [],
  };

  for (const section of sections) {
    try {
      const files = await fetchFolder(section.folderId, apiKey);
      totalFiles += files.length;

      if (files.length === 0) {
        console.warn(`  !! ${section.label}: 0 files (check folder sharing permissions)`);
      } else {
        console.log(`  ${section.label}: ${files.length} file(s)`);
      }

      result.sections.push({
        id: section.id,
        folderId: section.folderId,
        files,
      });
    } catch (err) {
      console.error(`  !! ${section.label}: ERROR — ${err.message}`);
      result.sections.push({
        id: section.id,
        folderId: section.folderId,
        files: [],
      });
    }
  }

  const outPath = resolve(__dirname, 'manifest.json');
  writeFileSync(outPath, JSON.stringify(result, null, 2));
  console.log(`\nDone. ${totalFiles} files across ${sections.length} sections.`);
  console.log(`Written to: ${outPath}`);
}

main();
