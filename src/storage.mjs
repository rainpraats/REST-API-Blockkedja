import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import AppError from './models/appError.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// trycatch could be wrapped in asynctrycatch function

export default class Storage {
  #filePath = undefined;
  #folderPath = undefined;

  constructor(folder, filename) {
    this.#folderPath = path.join(__dirname, folder);
    this.#filePath = path.join(__dirname, folder, filename);
  }

  async createDirectory() {
    try {
      await fs.mkdir(this.#folderPath, { recursive: true });
    } catch (error) {
      throw new AppError(`Failed to create directory: ${error.message}`, 500);
    }
  }

  async readFromFile() {
    try {
      return await fs.readFile(this.#filePath, 'utf-8');
    } catch (error) {
      throw new AppError(error, 500);
    }
  }

  async writeToFile(data) {
    try {
      await fs.access(this.#filePath);
      await fs.appendFile(this.#filePath, data, 'utf-8');
    } catch (error) {
      this.createDirectory();
      await fs.writeFile(this.#filePath, data, 'utf-8');
    }
  }
}
