import { Router } from 'express';
import { ApiPath, UsersApiPath, HttpCode } from '../../common/enums/enums';
import asyncHandler from 'express-async-handler';
import { user as userService } from '../../services/services';
import {
  checkJwt as checkJwtMiddleware,
  validateSchema as validateSchemaMiddleware,
} from '../../middlewares/middlewares';
import { userUpdate as userUpdateValidationSchema } from '../../validation-schemas/validation-schemas';

type Args = {
  apiRouter: Router;
  userService: typeof userService;
};

const initUsersApi = ({ apiRouter, userService }: Args): Router => {
  const userRouter = Router();
  apiRouter.use(ApiPath.USERS, userRouter);

  userRouter.get(
    UsersApiPath.ROOT,
    checkJwtMiddleware,
    asyncHandler(async (_req, res) => {
      res.json(await userService.getAll()).status(HttpCode.OK);
    }),
  );

  userRouter.get(
    UsersApiPath.$ID,
    //todo: check (userOwner)? get user: throw error
    checkJwtMiddleware,
    asyncHandler(async (req, res) => {
      res
        .json(await userService.getById(Number(req.params.id)))
        .status(HttpCode.OK);
    }),
  );

  userRouter.put(
    UsersApiPath.$ID,
    //todo: check (userOwner)? edit user: throw error
    checkJwtMiddleware,
    validateSchemaMiddleware(userUpdateValidationSchema),
    asyncHandler(async (req, res) => {
      res
        .json(await userService.update(Number(req.params.id), req.body))
        .status(HttpCode.OK);
    }),
  );

  return userRouter;
};

export { initUsersApi };
