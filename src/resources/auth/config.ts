import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export const tokenConfig = {
  secret: JWT_SECRET_KEY || 'secret-key',
  refreshSecretKey: 'refreshKey',
  expiresAccessToken: '1h',
  expiresRefreshToken: '1d',
};
