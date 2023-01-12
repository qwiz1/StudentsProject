import { Router } from 'express';
import { ApiPath, UsersApiPath, HttpCode } from '../../common/enums/enums';

type Args = {
  apiRouter: Router;
};

const initUsersApi = ({ apiRouter }: Args): Router => {
  const userRouter = Router();
  apiRouter.use(ApiPath.USERS, userRouter);

  userRouter.get(UsersApiPath.ROOT, (req, res) => {
    res.json('Hey, from users!').status(HttpCode.OK);
  });

  return userRouter;
};

export { initUsersApi };
