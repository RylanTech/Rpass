import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { user } from '../models/user';


const secret = 'Super secret secret.... 42';

export const signUserToken = async (user: user) => {
  let token = jwt.sign(
      { userId: user.userId },
      secret,
      { expiresIn: '7d' }
  );
  
  return token;
}

export const verifyUser = async (req: Request) => {
  // Get the Authorization header from the request
  const authHeader = req.headers.authorization;

  // If header exists, parse token from `Bearer <token>`
  if (authHeader) {
      const token = authHeader.split(' ')[1];

      // Verify the token and get the user
      try {
          let decoded: any = await jwt.verify(token, secret);
          return user.findByPk(decoded.userId);
      }
      catch (err) {
          return null;
      }
  }
  else {
      return null;
  }
}

export const verifyToken = async (token: string) => {
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET_KEY || 'default_secret_key');
    return decoded;
  } catch (err) {
    return null;
  }
};
