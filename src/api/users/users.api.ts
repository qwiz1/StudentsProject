import { Router } from 'express';
import { ApiPath, UsersApiPath, HttpCode } from '../../common/enums/enums';
import { usersMock } from './users.mock';

type Args = {
  apiRouter: Router;
};

const initUsersApi = ({ apiRouter }: Args): Router => {
  const userRouter = Router();
  apiRouter.use(ApiPath.USERS, userRouter);

  userRouter.get(UsersApiPath.ROOT, (req, res) => {
    //Todo: return res.json(await userService.getAll()).status(HttpCode.OK);
    return res.json(usersMock).status(HttpCode.OK);
  });

  userRouter.get(UsersApiPath.$ID, (req, res) => {
    const user = usersMock.find((user) => user.id === req.params.id);
    //Todo: return res.json(await userService.getById()).status(HttpCode.OK);
    return res.json(user).status(HttpCode.OK);
  });

  userRouter.put(UsersApiPath.$ID, (req, res) => {
    //To-do: res.json(await userService.update(Number(req.params.id), req.body)).status(HttpCode.OK);
    return res.json('Not implemented yet').status(HttpCode.OK)
  });

  return userRouter;
};

export { initUsersApi };
