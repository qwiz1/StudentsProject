import { Router } from 'express';
import { ApiPath, AuthApiPath, HttpCode } from '../../common/enums/enums';
import { auth as authService } from '../../services/services';
import asyncHandler from 'express-async-handler';
import { validateSchema } from '../../middlewares/validation/validation.middleware';
import {
  signUp as signUpValidationSchema,
  signIn as signInValidationSchema,
} from '../../validation-schemas/user/user';

type Args = {
  apiRouter: Router;
  authService: typeof authService;
};

const initAuthApi = ({ apiRouter, authService }: Args): Router => {
  const authRouter = Router();
  apiRouter.use(ApiPath.AUTH, authRouter);

  authRouter.post(
    AuthApiPath.SIGN_UP,
    validateSchema(signUpValidationSchema),
    asyncHandler(async (req, res) => {
      const user = await authService.signUp(req.body);
      res.json(user).status(HttpCode.CREATED);
    }),
  );

  authRouter.post(
    AuthApiPath.SIGN_IN,
    validateSchema(signInValidationSchema),
    asyncHandler(async (req, res) => {
      res.json(await authService.signIn(req.body)).status(HttpCode.OK);
    }),
  );
  return authRouter;
};

export { initAuthApi };
