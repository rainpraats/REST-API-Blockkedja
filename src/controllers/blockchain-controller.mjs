import BlockchainRepository from '../repositories/blockchainRepository.mjs';
import { catchErrorAsync } from '../utilities/catchErrorAsync.mjs';

export const listAllBlocks = catchErrorAsync(async (req, res) => {
  const chain = await new BlockchainRepository().getStoredChain();
  res.status(200).json({ success: true, data: chain });
});

export const addBlock = catchErrorAsync(async (req, res) => {
  const { data } = req.body;

  const chain = await new BlockchainRepository().saveNewBlock(data);

  res.status(201).json({
    success: true,
    message: 'Block was added',
    data: chain,
  });
});

export const getBlockByHash = catchErrorAsync(async (req, res) => {
  const chain = await new BlockchainRepository().getStoredChain();
  const block = chain.find((block) => block.hash === req.params.hash);
  res.status(200).json({
    success: true,
    data: block || `There's no block with hash ${req.params.hash} on chain`,
  });
});
