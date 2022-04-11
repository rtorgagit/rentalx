import { Request, NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '../errors/AppError';
import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new AppError('Token missing!', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, 'c916a04dbee6ba8a28d70f4131b0b78e') as IPayload;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findByID(user_id);
    if (!user) {
      throw new AppError('User not found!', 401);
    }

    next();
  } catch (err) {
    throw new AppError('Invalid token', 401);
  }
}
