import AppError from "@shared/errors/AppError";

import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import FakeMailProvider from "@shared/container/providers/MailProvider/fakes/FakeMailProvider";
import SendForgotPasswordEmailService from "./SendForgotPasswordEmailService";
import FakeUserTokensRepository from "../repositories/fakes/FakeUserTokensRepository";

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
    beforeEach(() => {
      fakeUsersRepository = new FakeUsersRepository();
      fakeMailProvider = new FakeMailProvider();
      fakeUserTokensRepository = new FakeUserTokensRepository();


      sendForgotPasswordEmail = new SendForgotPasswordEmailService(
        fakeUsersRepository,
        fakeMailProvider,
        fakeUserTokensRepository,
      );
    });

    it('should be able to recover the password using email adress', async () => {
        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        await fakeUsersRepository.create({
          name: 'Fulano Silva',
          email: 'fulanosilva@example.com',
          password: '123456',
        });


        await sendForgotPasswordEmail.execute({
          email: "fulanosilva@example.com",
        });

        expect(sendMail).toHaveBeenCalled();
    });

    it('should not be able to recover a non-existing user password', async () => {
      await expect(sendForgotPasswordEmail.execute({
        email: 'fulanosilva@example.com'
      })).rejects.toBeInstanceOf(AppError);
    });

    it('should generate forgot password token', async () => {
      const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

      const user = await fakeUsersRepository.create({
        name: 'Fulano Silva',
        email: 'fulanosilva@example.com',
        password: '123456'
      });

      await sendForgotPasswordEmail.execute({
        email: 'fulanosilva@example.com'
      });

      expect(generateToken).toHaveBeenCalledWith(user.id);
    });
});
