import jwt from 'jsonwebtoken';
import type ProcessEnv from '../@types/env';

const signToken = (userId: number): string => {
  try {
    const token = jwt.sign(
      {
        id: userId
      },
      process.env.JWT_SECRET as ProcessEnv['JWT_SECRET'],
      {
        expiresIn: process.env.EXPIRES_IN_JWT_SECRET as ProcessEnv['EXPIRES_IN_JWT_SECRET']
      }
    );
    return token;
  } catch (error) {
    throw new Error('Error signing token');
  }
};

export default signToken;
