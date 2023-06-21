const { register } = require('../controller/auth');

describe('User Controller', () => {
  describe('register', () => {
    it('should create a new user', async () => {
      // Mock request and response objects
      const req = {
        body: {
          username: 'testuser',
          email: 'test@example.com',
          password: 'testpassword',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Call the register function
      await register(req, res);

      // Verify the response
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        data: expect.objectContaining({
          username: 'testuser',
          email: 'test@example.com',
        }),
      });
    });
  });
});
