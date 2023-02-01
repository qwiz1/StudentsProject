import { Request, Response, NextFunction } from 'express';
import { ENV, HttpCode } from '../../common/enums/enums';
import jwt from 'jsonwebtoken';

const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res
        .status(HttpCode.UNAUTHORIZED)
        .json({ message: 'User unauthorized' });
    }
    jwt.verify(token, ENV.JWT.SECRET as string);
    next();
  } catch (e) {
    console.log(e);
    return res
      .status(HttpCode.UNAUTHORIZED)
      .json({ message: 'User unauthorized' });
  }
};

export { checkJwt };
