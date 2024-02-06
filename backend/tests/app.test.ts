import request from 'supertest';
import { app, server } from '../index'; // Assurez-vous que le chemin est correct

afterAll((done) => {
  server.close(done);
});

describe('API Tests', () => {
  it('should respond with Hello, World!', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('Hello, World!');
  });

  it('should handle invalid routes with 404 status', async () => {
    const response = await request(app).get('/invalid-route');
    expect(response.status).toBe(404);
  });
});
