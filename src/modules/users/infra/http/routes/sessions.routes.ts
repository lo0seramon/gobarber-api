import { Router } from 'express';

import AuthenticationUserService from '@modules/users/services/AuthenticationUserService'
import UsersRepository from '../../typeorm/repositories/UsersRepository';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  const usersRepository = new UsersRepository();
  const authenticationUser = new AuthenticationUserService(usersRepository);

  const { email, password } = req.body;

  const { user, token } = await authenticationUser.execute({ email, password });

  const userWithoutPassword = {
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };

  return res.json({ userWithoutPassword, token });
});

export default sessionsRouter;
