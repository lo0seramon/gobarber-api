import User from "../infra/typeorm/entities/Users";
import UserToken from "../infra/typeorm/entities/UsersToken";

export default interface IUserTokensRepository {
  generate(user_id: string): Promise<UserToken>;
}
