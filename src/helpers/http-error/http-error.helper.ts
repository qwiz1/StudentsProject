import { HttpCode } from '../../common/enums/enums';

const DEFAULT_MESSAGE = 'Network Error';
const EXCEPTION_NAME = 'HttpError';

class HttpError extends Error {
  status: HttpCode;

  constructor({
    status = HttpCode.INTERNAL_SERVER_ERROR,
    message = DEFAULT_MESSAGE,
  } = {}) {
    super(message);
    this.status = status;
    this.name = EXCEPTION_NAME;
  }
}

export { HttpError };
