# REST-API-Blockkedja

## Available HTTP request methods

- GET /api/v1/blockchain/ - Get all blocks
- GET /api/v1/blockchain/:hash - Get a block by hash
- POST /api/v1/blockchain/mine - Create a new block

## Setup

Remember to create a config.env file and place it in the map config.env

The file should have these values:
PORT and NODE_ENV
