import { Request, Response } from "express";
import { container } from 'tsyringe';

import AuthenticationUserService from '@modules/users/services/AuthenticationUserService'


export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const authenticationUser = container.resolve(AuthenticationUserService);

    const { email, password } = request.body;

    const { user, token } = await authenticationUser.execute({ email, password });

    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return response.json({ userWithoutPassword, token });
  }
}
