import Blockchain from '../models/Blockchain.mjs';
import Storage from '../storage.mjs';

export default class BlockchainRepository {
  #storage = undefined;

  constructor() {
    this.#storage = new Storage('data', 'chain.json');
  }

  async getStoredChain() {
    const chain = JSON.parse(await this.#storage.readFromFile());
    if (!chain.length) {
      const chain = new Blockchain().chain;
      await this.#storage.writeToFile(JSON.stringify(chain));
    }
    return chain;
  }

  async saveNewBlock(data) {
    const blockchain = new Blockchain();
    blockchain.chain = await this.getStoredChain();
    blockchain.addBlock({ data: data });
    await this.#storage.writeToFile(JSON.stringify(blockchain.chain));
    return blockchain.chain;
  }
}
