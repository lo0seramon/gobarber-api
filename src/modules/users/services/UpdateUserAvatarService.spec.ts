import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import UpdateUserAvatarService from "./UpdateUserAvatarService";
import FakeStoragProvider from "@shared/container/providers/StorageProvider/fakes/FakeStorageProvider";
import AppError from "@shared/errors/AppError";

describe('UpdateUserAvatar', () => {
    it('should be able to update user avatar', async () => {
       const fakeUsersRepository = new FakeUsersRepository();
       const fakeStorageProvider = new FakeStoragProvider();

       const updateUserService = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider);

       const user = await fakeUsersRepository.create({
         name: 'Fulano Silva',
         email: 'fulanosilva@example.com',
         password: '123456'
        });

       await updateUserService.execute({
            user_id: user.id,
            avatarFileName: 'avatar.jpg'
        });

       expect(user.avatar).toBe('avatar.jpg');
    });

    it('should not be able to update avatr with non existing user', async () => {
      const fakeUsersRepository = new FakeUsersRepository();
      const fakeStorageProvider = new FakeStoragProvider();

      const updateUserService = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider);

      await expect(
        updateUserService.execute({
          user_id: 'non-exisiting-user',
          avatarFileName: 'avatar.jpg'
        })
      ).rejects.toBeInstanceOf(AppError);
    });

    it('should delete old avatar when updating new one', async () => {
      const fakeUsersRepository = new FakeUsersRepository();
      const fakeStorageProvider = new FakeStoragProvider();

      const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

      const updateUserService = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider);

      const user = await fakeUsersRepository.create({
        name: 'Fulano Silva',
        email: 'fulanosilva@example.com',
        password: '123456'
      });

      await updateUserService.execute({
        user_id: user.id,
        avatarFileName: 'avatar.jpg'
      });

      await updateUserService.execute({
        user_id: user.id,
        avatarFileName: 'avatar2.jpg'
      });

      expect(deleteFile).toBeCalledWith('avatar.jpg');
      expect(user.avatar).toBe('avatar2.jpg');
    });
  });
