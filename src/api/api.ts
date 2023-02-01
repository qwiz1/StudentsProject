import { Router } from 'express';
import { ENV } from '../common/enums/enums';
import { auth as authService, user as userService } from '../services/services';
import { initAuthApi } from './auth/auth.api';
import { initCharacterApi } from './characters/characters.api';
import { initUsersApi } from './users/users.api';

const initApi = (app: Router): Router => {
  const apiRouter = Router();

  app.use(ENV.API, apiRouter);

  initAuthApi({
    apiRouter,
    authService,
  });

  initUsersApi({
    apiRouter,
    userService,
  });

  initCharacterApi({
    apiRouter,
  });

  return apiRouter;
};

export { initApi };
