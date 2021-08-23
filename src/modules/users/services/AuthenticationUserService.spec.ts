import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import AuthenticationUserService from "./AuthenticationUserService";
import CreateUserService from "./CreateUserService";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import AppError from "@shared/errors/AppError";

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

    it('should not be able to authenticate with non existing', async () => {
      const fakeUsersRepository = new FakeUsersRepository();
      const fakeHashProvider = new FakeHashProvider();

      const authenticateUser = new AuthenticationUserService(
        fakeUsersRepository,
        fakeHashProvider
       );

       await expect(
        authenticateUser.execute({
        email: "fulanosilva@example.com",
        password: "123456"
      })).rejects.toBeInstanceOf(AppError);
   });

   it('should not be able to authenticate with unexisting password', async () => {
       const fakeUsersRepository = new FakeUsersRepository();
       const fakeHashProvider = new FakeHashProvider();

       const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
       const authenticateUser = new AuthenticationUserService(
         fakeUsersRepository,
         fakeHashProvider
        );

        await createUser.execute({
            name: "Fulano Silva",
            email: "fulano@silva@gmail.com",
            password: "123456"
        });

        await expect(
          authenticateUser.execute({
            email: "fulano@silva@gmail.com",
            password: "654321"
          })
        ).rejects.toBeInstanceOf(AppError);
  });
});
