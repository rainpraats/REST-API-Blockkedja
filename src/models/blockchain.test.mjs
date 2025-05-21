import Blockchain from './Blockchain.mjs';
import Block from './Block.mjs';
import { beforeEach, describe, expect } from 'vitest';

describe('Blockchain', () => {
  let blockchain, blockchain_2, originalChain;

  beforeEach(() => {
    blockchain = new Blockchain();
    blockchain_2 = new Blockchain();
    originalChain = blockchain.chain;
  });

  it('should contain an array of blocks', () => {
    expect(blockchain.chain instanceof Array).toBeTruthy();
  });

  it('should start with the genesis block', () => {
    expect(blockchain.chain.at(0)).toEqual(Block.genesis());
  });

  it('should add a new block to the chain', () => {
    const data = 'Some data';
    blockchain.addBlock({ data });
    expect(blockchain.chain.at(-1).data).toEqual(data);
  });

  describe('isValid() chain function when', () => {
    describe('the genesis block is missing or not the first block in the chain', () => {
      it('should return false', () => {
        blockchain.chain[0] = 'strange-block';
        expect(Blockchain.isValid(blockchain.chain)).toBeFalsy();
      });
    });

    describe('Chain starts with genesis block followed by many other blocks', () => {
      beforeEach(() => {
        blockchain.addBlock({ data: 'one' });
        blockchain.addBlock({ data: 'two' });
        blockchain.addBlock({ data: 'three' });
        blockchain.addBlock({ data: 'four' });
        blockchain.addBlock({ data: 'five' });
      });

      describe('but the lastHash has changed', () => {
        it('should return false', () => {
          blockchain.chain.at(2).lastHash = 'Ooops!';
          expect(Blockchain.isValid(blockchain.chain)).toBeFalsy();
        });
      });

      describe('but the chain contains a block with invalid information', () => {
        it('should return false', () => {
          blockchain.chain.at(1).data = 'You are hacked!!!';
          expect(Blockchain.isValid(blockchain.chain)).toBeFalsy();
        });
      });

      describe('and the chain does not contain any invalid blocks', () => {
        it('returns true', () => {
          expect(Blockchain.isValid(blockchain.chain)).toBeTruthy();
        });
      });
    });
  });

  describe('Replace chain', () => {
    describe('If new chain is shorter or equal to first chain', () => {
      it('First chain is not replaced', () => {
        blockchain_2.chain[0] = { data: 'New data in block' };

        blockchain.replaceChain(blockchain_2.chain);

        expect(blockchain.chain).toEqual(originalChain);
      });
    });

    describe('when the new chain is longer', () => {
      beforeEach(() => {
        blockchain_2.addBlock({ data: 'Octopus' });
        blockchain_2.addBlock({ data: 'Horse' });
      });

      describe('but is invalid', () => {
        it('should not replace the chain', () => {
          blockchain_2.chain[1].hash = 'This hash got changed';
          blockchain.replaceChain(blockchain_2.chain);

          expect(blockchain.chain).toEqual(originalChain);
        });
      });
      describe('but is valid', () => {
        beforeEach(() => {
          blockchain.replaceChain(blockchain_2.chain);
        });

        it('should replace the chain', () => {
          expect(blockchain.chain).toEqual(blockchain_2.chain);
        });
      });
    });
  });
});
