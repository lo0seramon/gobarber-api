import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

//import User from "@modules/users/infra/typeorm/entities/Users";
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface IRequest {
  token: string,
  password: string
}

@injectable()
class RestPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('HashProvider')
    private hashProvider: IUserHashProvider,

  ){}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if(!userToken) {
      throw new AppError('User token does not exists.');
    }
    const user = await this.usersRepository.findById(userToken?.user_id);

    if(!user) {
      throw new AppError('User does not exists.');
    }

    user.password = password;

    await this.usersRepository.save(user);
  }

}

export default RestPasswordService;
