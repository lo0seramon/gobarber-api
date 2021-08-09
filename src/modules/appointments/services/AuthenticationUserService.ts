import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../../../config/auth';4

import AppError from '../../../shared/errors/AppError';

import User from '../../../entities/Users';

interface Request {
  email: string,
  password: string
}

interface Response {
  user: User
  token: string
}

class AuthenticationUserService {
  public async execute({email, password}: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if(!user) {
      throw new AppError('Incorrect email/password. Try again.', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if(!passwordMatched) {
      throw new AppError('Incorrect email/password. Try again.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn: '1d'
    });

    return {
      user,
      token
    }
  }
}

export default AuthenticationUserService;