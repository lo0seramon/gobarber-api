import AppError from "@shared/errors/AppError";
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import AuthenticationUserService from "./AuthenticationUserService";
import CreateUserService from "./CreateUserService";

describe('AuthenticationUser', () => {
    it('should be able to authenticate', async () => {
       const fakeUsersRepository = new FakeUsersRepository();

       const createUser = new CreateUserService(fakeUsersRepository);
       const authenticateUser = new AuthenticationUserService(
         fakeUsersRepository,
        );

        await createUser.execute({
            name: "Fulano Silva",
            email: "fulano@silva@gmail.com",
            password: "123456"
        });


        const response = await authenticateUser.execute({
          email: "fulano@silva@gmail.com",
          password: "123456"
        });

        expect(response).toHaveProperty('token');
    });

});
