import request from 'supertest';
import { app } from '../app.mjs';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

it('should append to the error.log file after an error.', async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const logsDirPath = path.join(__dirname, '../logs');
  const errorLogFilePath = path.join(__dirname, '../logs', 'errors.log');

  await fs.mkdir(logsDirPath, { recursive: true });
  try {
    await fs.access(errorLogFilePath);
  } catch {
    await fs.writeFile(errorLogFilePath, '', 'utf-8');
  }

  const before = await fs.readFile(errorLogFilePath);

  await request(app).get('/route/that/causes/error');
  await new Promise((res) => setTimeout(res, 10));

  const after = await fs.readFile(errorLogFilePath);

  expect(after.length).toBeGreaterThan(before.length);
});
