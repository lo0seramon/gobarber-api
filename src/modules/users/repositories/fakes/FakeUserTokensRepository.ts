import { uuid } from "uuidv4";

import IUserTokensRepository from "../IUserTokensRepository";
import UserToken from "@modules/users/infra/typeorm/entities/UsersToken";

class FakeUserTokensRepository implements IUserTokensRepository {
  private userTokens: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id,
    });

    this.userTokens.push(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const findUserToken = this.userTokens.find(userToken => userToken.token === token);

    return findUserToken;
  }
}

export default FakeUserTokensRepository;
