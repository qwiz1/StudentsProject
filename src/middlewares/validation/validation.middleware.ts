import { RequestHandler } from 'express';
import { Schema } from 'joi';
import { HttpError } from '../../helpers/helpers';
import { HttpCode } from '../../common/enums/enums';

const validateSchema = (schema: Schema): RequestHandler => {
  const handler: RequestHandler = (req, _res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: error.message,
      });
    }
    next();
  };
  return handler;
};

export { validateSchema };
