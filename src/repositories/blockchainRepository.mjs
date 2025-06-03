import Blockchain from '../models/Blockchain.mjs';
import Storage from '../storage.mjs';

export default class BlockchainRepository {
  #storage = undefined;

  constructor() {
    this.#storage = new Storage('data', 'chain.json');
  }

  async getStoredChain() {
    let chain = JSON.parse(await this.#storage.readFromFile());

    if (!Blockchain.isValid(chain)) {
      chain = new Blockchain().chain;
      await this.#storage.writeToFile(JSON.stringify(chain));
    }
    return chain;
  }

  async saveNewBlock(data) {
    const blockchain = new Blockchain();
    const chain = await this.getStoredChain();
    blockchain.replaceChain(chain);
    blockchain.addBlock({ data: data });
    await this.#storage.writeToFile(JSON.stringify(blockchain.chain));
    return blockchain.chain;
  }
}
