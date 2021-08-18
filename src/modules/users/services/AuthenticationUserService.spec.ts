import AppError from "@shared/errors/AppError";
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import AuthenticationUserService from "./AuthenticationUserService";
import CreateUserService from "./CreateUserService";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";

describe('AuthenticationUser', () => {
    it('should be able to authenticate', async () => {
       const fakeUsersRepository = new FakeUsersRepository();
       const fakeHashProvider = new FakeHashProvider();

       const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
       const authenticateUser = new AuthenticationUserService(
         fakeUsersRepository,
         fakeHashProvider
        );

        const user = await createUser.execute({
            name: "Fulano Silva",
            email: "fulano@silva@gmail.com",
            password: "123456"
        });


        const response = await authenticateUser.execute({
          email: "fulano@silva@gmail.com",
          password: "123456"
        });

        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(user);
    });

});
