import { Router } from 'express';
import { ENV } from '../common/enums/enums';
import { initAuthApi } from './auth/auth.api';
import { initCharacterApi } from './characters/characters.api';
import { initUsersApi } from './users/users.api';

const initApi = (app: Router): Router => {
  const apiRouter = Router();

  app.use(ENV.API, apiRouter);

  initAuthApi({
    apiRouter
  });

  initUsersApi({
    apiRouter
  })

  initCharacterApi({
    apiRouter
  })

  return apiRouter;
};

export { initApi };
