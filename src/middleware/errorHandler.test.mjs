import request from 'supertest';
import { app } from '../app.mjs';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { setTimeout } from 'timers';

it('should create the log file after an error.', async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const logsDirPath = path.join(__dirname, '../logs');

  await fs.mkdir(logsDirPath, { recursive: true });

  const before = await fs.readdir(logsDirPath);

  await request(app).get('/route/that/causes/error');

  const after = await fs.readdir(logsDirPath);

  setTimeout(() => {
    expect(after.length).toBeGreaterThan(before.length);
  }, 1000);
});
