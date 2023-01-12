import { Router } from 'express';
import { ApiPath, AuthApiPath, HttpCode } from '../../common/enums/enums';

type Args = {
  apiRouter: Router;
};

const initAuthApi = ({ apiRouter }: Args): Router => {
  const authRouter = Router();
  apiRouter.use(ApiPath.AUTH, authRouter);

  //Just for test
  authRouter.get(AuthApiPath.ROOT, (req, res) => {
    res.json('Hey, from auth!').status(HttpCode.OK);
  });

  return authRouter;
};

export { initAuthApi };
