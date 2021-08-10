import { hash } from  'bcryptjs';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from "@modules/users/infra/typeorm/entities/Users";
import IUsersRepository from '../repositories/IUsersRepository';

interface Request {
  name: string,
  email: string,
  password: string
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ){}

  public async execute({ name, email, password }: Request): Promise<User> {

    const checkIfUserExists = await this.usersRepository.findByEmail(email);

    if(checkIfUserExists) {
      throw new AppError('User already exists.')
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword
    })

    return user;
  }

}

export default CreateUserService;
