import User from "../infra/typeorm/entities/Users";
import ICreateUserDTO from "../dtos/ICreateUserDTO";

export default interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(id: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(data: ICreateUserDTO): Promise<void>;
}
