import request from 'supertest';
import app from '../src/index';
import {dbCleanup} from './dbCleanup';

describe('API test', () => {
  let api: request.SuperTest<any>;
  
  beforeAll(async () => {
    api = await request(app);
  });

  afterAll(async () => {
    await dbCleanup();
  });

  describe('Add a new task: POST /register', () => {
    it('Should return validation error', async () => {
      const body = {
        title: 'Test task',
        description: '',
      };
  
      const expectedRes = {
        statusCode: 400,
        errorCode: 'invalid_request_body',
      };
  
      await api.post('/v1/tasks')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(body)
        .expect('Content-Type', /json/)
        .expect(expectedRes.statusCode)
        .then((res: any) => {
          expect(res.body.error.code).toEqual(expectedRes.errorCode);
          expect(res.body.error.details.length).toEqual(1);
        });
    });

    it('Should return created task data', async () => {
      const body = {
        title: 'Test task',
        description: 'A simple description',
      };
  
      const expectedRes = {
        statusCode: 200,
        data: {
          ...body,
          status: 'in-progress',
        }
      };
  
      await api.post('/v1/tasks')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(body)
        .expect('Content-Type', /json/)
        .expect(expectedRes.statusCode)
        .then((res: any) => {
          expect(res.body.data).toMatchObject(expectedRes.data);
        });
    });
  });
});