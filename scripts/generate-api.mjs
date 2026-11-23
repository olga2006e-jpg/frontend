import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { generateApi } from 'swagger-typescript-api';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SWAGGER_URL = process.env.SWAGGER_URL ?? 'http://localhost:8000/openapi.json';
const OUTPUT_DIR = path.resolve(__dirname, '..', 'src', 'api');

async function main() {
  console.log(`[generate-api] Fetching schema from ${SWAGGER_URL} ...`);
  await generateApi({
    url: SWAGGER_URL,
    output: OUTPUT_DIR,
    fileName: 'Api.ts',
    httpClientType: 'axios',
    generateClient: true,
    modular: false,
    singleHttpClient: true,
  });
  console.log('[generate-api] Done -> src/api/Api.ts');
}

main().catch((err) => {
  console.error('[generate-api] Failed:', err);
  process.exit(1);
});
