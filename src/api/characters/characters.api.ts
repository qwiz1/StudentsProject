import { Router } from 'express';
import { ApiPath, CharactersApiPath, HttpCode } from '../../common/enums/enums';

type Args = {
  apiRouter: Router;
};

const initCharacterApi = ({ apiRouter }: Args): Router => {
  const characterRouter = Router();
  apiRouter.use(ApiPath.CHARACTERS, characterRouter);

  characterRouter.get(CharactersApiPath.ROOT, (req, res) => {
    res.json('Hey, from characters!').status(HttpCode.OK);
  });

  return characterRouter;
};

export { initCharacterApi };
