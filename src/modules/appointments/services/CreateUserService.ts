import { getRepository } from 'typeorm';
import { hash } from  'bcryptjs';

import AppError from '../errors/AppError';

import User from "../models/Users";

interface Request {
  name: string,
  email: string,
  password: string
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepsitory = getRepository(User);

    const checkIfUserExists = await usersRepsitory.findOne({
      where: { email }
    });

    if(checkIfUserExists) {
      throw new AppError('User already exists.')
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepsitory.create({
      name,
      email,
      password: hashedPassword
    })

    await usersRepsitory.save(user);

    return user;
  }

}

export default CreateUserService;
