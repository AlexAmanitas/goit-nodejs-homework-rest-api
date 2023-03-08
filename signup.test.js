const app = require('./app');

const mongoose = require('mongoose');

const { DB_HOST, PORT = 3000 } = process.env;
mongoose.set('strictQuery', true);

beforeAll(() => {
  mongoose
    .connect(DB_HOST)
    .then(() => {
      console.log('Database connect success');
      app.listen(PORT, () => {
        console.log('Server running. Use our API on port: 3000');
      });
    })
    .catch(err => {
      console.log(err.message);
      process.exit(1);
    });
});

afterAll(async () => {
  await mongoose.disconnect();
  console.log('Database disconnect');
});

const { logIn } = require('./controllers/auth');

describe('logIn', () => {
  it('should return a token and user object when valid credentials are provided', async () => {
    const req = { body: { email: 'test@example.com', password: 'password' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await logIn(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      token: expect.any(String),
      user: { email: 'test@example.com', subscription: 'starter' },
    });
  });

  it('should throw an error when invalid credentials are provided', async () => {
    const req = {
      body: { email: 'test@example.com', password: 'wrongpassword' },
    };

    await expect(logIn(req)).rejects.toThrowError('Email or password is wrong');
  });
});
