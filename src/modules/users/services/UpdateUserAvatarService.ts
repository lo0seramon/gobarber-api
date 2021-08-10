import path from 'path';
import fs from 'fs';
import User from '@modules/users/infra/typeorm/entities/Users';

import AppError from '@shared/errors/AppError';

import uploadConfig from '@config/upload';
import IUsersRepository from '../repositories/IUsersRepository';

interface Request {
  user_id: string,
  avatarFileName: string
}

class UpdateUserAvatarService {
  constructor(private usersRepository: IUsersRepository){}

  public async execute({ user_id, avatarFileName }: Request): Promise<User> {

    const user = await this.usersRepository.findById(user_id);

    if(!user) {
      throw new AppError('Only authenticated user can update avatar!', 401);
    }

    if(user.avatar) {
       const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
       const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

       if(userAvatarFileExists) {
         await fs.promises.unlink(userAvatarFilePath);
       }
    }

    user.avatar = avatarFileName;

    await this.usersRepository.save(user);

    return user;
  }

}
export default UpdateUserAvatarService;
