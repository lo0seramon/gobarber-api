import { Repository, getRepository } from 'typeorm';

import User from "../entities/Users";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne(id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }

  public async create({name, email, password}: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      name,
      email,
      password
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(data: ICreateUserDTO): Promise<void> {
    await this.ormRepository.save(data);
  }
}

export default UsersRepository;