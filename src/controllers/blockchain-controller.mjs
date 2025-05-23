import Blockchain from '../models/Blockchain.mjs';

const blockChain = new Blockchain();

export const listAllBlocks = (req, res) => {
  res.status(200).json({ success: true, data: blockChain });
};

export const addBlock = (req, res) => {
  const { data } = req.body;

  blockChain.addBlock({ data });

  res.status(201).json({
    success: true,
    message: 'Block was added',
    data: blockChain.chain,
  });
};

export const getBlockByHash = (req, res) => {
  const block = blockChain.chain.find(
    (block) => block.hash === req.params.hash
  );
  res.status(200).json({
    success: true,
    data: block || `There's no block with hash ${req.params.hash}`,
  });
};
