const request = require('supertest');
const app = require('../app');
const Url = require('../models/url');

// Mock Url model methods
jest.mock('../models/url', () => ({
  findOne: jest.fn(),
  create: jest.fn(),
}));

// Mock QRCode module
jest.mock('qrcode', () => ({
  toFile: jest.fn(),
}));

describe('URL Shortener API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /shorten', () => {
    it('should return 409 if longUrl is missing or invalid', async () => {
      const response = await request(app)
        .post('/shorten')
        .send({ longUrl: '' });

      expect(response.status).toBe(409);
      expect(response.body).toEqual({ message: 'Wrong URL format!' });
    });

    it('should return 404 if user does not exist', async () => {
      Url.findOne.mockResolvedValueOnce(null);

      const response = await request(app)
        .post('/shorten')
        .send({ longUrl: 'http://example.com', email: 'user@example.com' });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'user does not exist' });
    });

    it('should create and return shortened URL', async () => {
      Url.findOne.mockResolvedValueOnce(null);
      Url.create.mockResolvedValueOnce({
        longUrl: 'http://example.com',
        shortUrl: 'http://short.com/abc123',
        shortId: 'abc123',
        userId: 'user123',
      });

      const response = await request(app)
        .post('/shorten')
        .send({ longUrl: 'http://example.com', userId: 'user123' });

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        url: {
          longUrl: 'http://example.com',
          shortUrl: 'http://short.com/abc123',
          shortId: 'abc123',
          userId: 'user123',
        },
      });
      expect(Url.create).toHaveBeenCalledWith({
        longUrl: 'http://example.com',
        shortUrl: 'http://short.com/abc123',
        shortId: 'abc123',
        userId: 'user123',
      });
    });
  });

  describe('GET /:shortId', () => {
    it('should redirect to longUrl if shortId exists', async () => {
      Url.findOne.mockResolvedValueOnce({
        longUrl: 'http://example.com',
        clicks: 0,
        save: jest.fn(),
      });

      const response = await request(app).get('/abc123');

      expect(response.status).toBe(302);
      expect(response.header.location).toBe('http://example.com');
      expect(Url.findOne).toHaveBeenCalledWith({ shortId: 'abc123' });
      expect(Url.findOne().save).toHaveBeenCalled();
    });

    it('should return 404 if shortId does not exist', async () => {
      Url.findOne.mockResolvedValueOnce(null);

      const response = await request(app).get('/xyz456');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'URL not found' });
      expect(Url.findOne).toHaveBeenCalledWith({ shortId: 'xyz456' });
    });
  });

  describe('GET /analytics/:shortId', () => {
    it('should return click count for a shortId', async () => {
      Url.findOne.mockResolvedValueOnce({
        clicks: 5,
      });

      const response = await request(app).get('/analytics/abc123');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ clicks: 5 });
      expect(Url.findOne).toHaveBeenCalledWith({ shortId: 'abc123' });
    });

    it('should return 404 if shortId does not exist', async () => {
      Url.findOne.mockResolvedValueOnce(null);

      const response = await request(app).get('/analytics/xyz456');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'URL not found' });
      expect(Url.findOne).toHaveBeenCalledWith({ shortId: 'xyz456' });
    });
  });

  describe('GET /qrcode/:shortId', () => {
    it('should return the QR code image for a shortId', async () => {
      Url.findOne.mockResolvedValueOnce({ shortId: 'abc123' });

      const response = await request(app).get('/qrcode/abc123');

      expect(response.status).toBe(200);
      expect(response.type).toBe('image/png');
      expect(Url.findOne).toHaveBeenCalledWith({ shortId: 'abc123' });
    });

    it('should return 400 if shortId is missing', async () => {
      const response = await request(app).get('/qrcode');

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: 'Please provide the shortId!' });
      expect(Url.findOne).not.toHaveBeenCalled();
    });

    it('should return 400 if shortId does not exist', async () => {
      Url.findOne.mockResolvedValueOnce(null);

      const response = await request(app).get('/qrcode/xyz456');

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: 'QR code image does not exist for the provided shortId!',
      });
      expect(Url.findOne).toHaveBeenCalledWith({ shortId: 'xyz456' });
    });
  });

  describe('POST /clicks', () => {
    it('should return the click count for a shortUrl', async () => {
      Url.findOne.mockResolvedValueOnce({
        clicks: [{ timestamp: Date.now() }, { timestamp: Date.now() }],
      });

      const response = await request(app)
        .post('/clicks')
        .send({ shortUrl: 'http://short.com/abc123' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ clickCount: 2 });
      expect(Url.findOne).toHaveBeenCalledWith({ shortUrl: 'http://short.com/abc123' });
    });

    it('should return 500 if failed to get click count', async () => {
      Url.findOne.mockRejectedValueOnce(new Error('Database error'));

      const response = await request(app)
        .post('/clicks')
        .send({ shortUrl: 'http://short.com/xyz456' });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Failed to get click count' });
      expect(Url.findOne).toHaveBeenCalledWith({ shortUrl: 'http://short.com/xyz456' });
    });
  });
});
