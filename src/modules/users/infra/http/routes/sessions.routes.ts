import { Router } from 'express';
import { container } from 'tsyringe';

import AuthenticationUserService from '@modules/users/services/AuthenticationUserService'

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  const authenticationUser = container.resolve(AuthenticationUserService);

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
