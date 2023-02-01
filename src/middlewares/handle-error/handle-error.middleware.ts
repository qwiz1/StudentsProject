import { ErrorRequestHandler } from 'express';
import { HttpCode } from '../../common/enums/enums';
import { HttpError } from '../../helpers/helpers';

const handleError: ErrorRequestHandler = (err: HttpError, req, res, next) => {
  const { status = HttpCode.INTERNAL_SERVER_ERROR, message, stack } = err;

  console.error(message, stack);

  return res.status(status).send({
    message,
  });
};

export { handleError };
