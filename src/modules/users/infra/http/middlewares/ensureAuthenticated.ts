import { Request, Response, NextFunction} from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';

interface TokenPayload {
  iat: number;
  ext: number;
  sub: string;
}

export default function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction): void {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
      throw new AppError('Token is missing!', 401);
    }

    const [, token] = authHeader.split(' ');

    const { secret } = authConfig.jwt;

    try {
      const decoded = verify(token, secret);

      const { sub } = decoded as TokenPayload;

      req.user = {
        id: sub,
      }

      return next();
    } catch (error) {
      throw new AppError('Invalid token!', 401);
    }


}
