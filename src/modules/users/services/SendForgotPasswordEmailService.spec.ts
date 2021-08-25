import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import FakeMailProvider from "@shared/container/providers/MailProvider/fakes/FakeMailProvider";
import SendForgotPasswordEmailService from "./SendForgotPasswordEmailService";

describe('SendForgotPasswordEmail', () => {
    it('should be able to recover the password using email adress', async () => {
       const fakeUsersRepository = new FakeUsersRepository();
       const fakeMailProvider = new FakeMailProvider();

       const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

       const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
         fakeUsersRepository,
         fakeMailProvider,
        );

        const user = await fakeUsersRepository.create({
          name: 'Fulano Silva',
          email: 'fulanosilva@example.com',
          password: '123456',
        });


        await sendForgotPasswordEmail.execute({
          email: "fulanosilva@example.com",
        });

        expect(sendMail).toHaveBeenCalled();
    });
});
