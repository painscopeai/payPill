import jwt from 'jsonwebtoken';
import { IAuthToken } from '@/types';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export const generateToken = (payload: Omit<IAuthToken, 'iat' | 'exp'>): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const verifyToken = (token: string): IAuthToken => {
  return jwt.verify(token, JWT_SECRET) as IAuthToken;
};

export const decodeToken = (token: string): IAuthToken | null => {
  try {
    return jwt.decode(token) as IAuthToken;
  } catch {
    return null;
  }
};
