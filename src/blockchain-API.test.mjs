import request from 'supertest';
import { app } from './app.mjs';
import { describe } from 'vitest';

describe('Can you send http requests while the server is running?', () => {
  describe('Mining of blocks', () => {
    let data, url;
    beforeEach(() => {
      data = 'Put me in a block';
      url = '/api/v1/blockchain/mine';
    });

    it('Mining a block returns 201.', async () => {
      await request(app).post(url).send({ data }).expect(201);
    });

    it('Mined block contains the function argument as data.', async () => {
      const response = await request(app).post(url).send({ data });
      const latestBlock = response.body.data.at(-1);
      const hash = latestBlock.hash;

      const requestedBlock = await request(app).get(
        `/api/v1/blockchain/${hash}`
      );
      const blockWithTheData = requestedBlock.body.data;

      expect(blockWithTheData.data).toBe(data);
    });
  });

  describe('Making GET requests', () => {
    let url;

    beforeEach(() => {
      url = '/api/v1/blockchain';
    });

    it('The http request should return the status 200.', async () => {
      await request(app).get(url).expect(200);
    });

    it('Should be possible to get a block by its hash.', async () => {
      const response = await request(app).get(url);
      const hash = response.body.data.at(-1).hash;
      await request(app).get(`${url}/${hash}`).expect(200);
    });
  });
});
