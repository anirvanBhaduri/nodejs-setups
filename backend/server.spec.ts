import supertest from 'supertest';
import TestAgent from 'supertest/lib/agent';
import Test from 'supertest/lib/test';

import { app } from './server';

describe('app', () => {
  let request: TestAgent<Test>;

  beforeEach(() => {
    request = supertest(app);
    jest.spyOn(global.console, 'log').mockImplementation();
  });

  it('should return a successful response for GET /', async () => {
    const response = await request.get('/');
    expect(response.body).toEqual({ message: 'Hello World' });
    expect(response.statusCode).toBe(200);
  });
});
