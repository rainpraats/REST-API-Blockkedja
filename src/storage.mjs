import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class Storage {
  #filePath = undefined;

  constructor(folder, filename) {
    this.#filePath = path.join(__dirname, folder, filename);
  }

  async readFromFile() {
    return await fs.readFile(this.#filePath, 'utf-8');
  }

  async writeToFile(data) {
    const folderPath = path.dirname(this.#filePath);
    await fs.mkdir(folderPath, { recursive: true });
    await fs.writeFile(this.#filePath, data, 'utf-8');
  }

  async appendToFile(data) {
    const folderPath = path.dirname(this.#filePath);
    await fs.mkdir(folderPath, { recursive: true });
    await fs.appendFile(this.#filePath, data, 'utf-8');
  }
}
