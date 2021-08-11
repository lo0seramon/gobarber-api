import AppError from "@shared/errors/AppError";
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import CreateUserService from "./CreateUserService";

describe('CreateUser', () => {
    it('should be able to create an user', async () => {
       const fakeUsersRepository = new FakeUsersRepository();
       const createUser = new CreateUserService(
         fakeUsersRepository,
        );

        const user = await createUser.execute({
          name: "Fulano Silva",
          email: "fulano@silva@gmail.com",
          password: "123456"
        });

        expect(user).toHaveProperty('id');
        expect(user.email).toBe('fulano@silva@gmail.com');
    });

    it('should not be able to create two users with same email adresses', async () => {
       const fakeUsersRepository = new FakeUsersRepository();
       const createUser = new CreateUserService(fakeUsersRepository);

       const user = await createUser.execute({
        name: "Fulano Silva",
        email: "fulano@silva@gmail.com",
        password: "123456"
       });

       expect(createUser.execute({
        name: "Fulano Silva",
        email: "fulano@silva@gmail.com",
        password: "123456"
      })).rejects.toBeInstanceOf(AppError);
    });
});
