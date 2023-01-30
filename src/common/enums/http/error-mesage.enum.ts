enum ErrorMessage {
  NOT_FOUND = 'Not found.',
  BAD_REQUEST = 'Bad Request',
  INTERNAL_SERVER_ERROR = 'Internal Server Error',
  USER_NOT_FOUND = 'User not found',
  WRONG_PASSWORD = 'Wrong password',
  PASSWORDS_NOT_MATCH = 'Passwords do not match',
  UNAUTHORIZED_TOKEN = 'No token provided',
  BAD_TOKEN = 'Token is invalid',
  EMAIL_IS_ALREADY_TAKEN = 'Email is already taken',
  NO_PERMISSION_TO_EDIT_USER = 'You do not have permission to edit',
  EMAIL_DOES_NOT_EXIST = 'Email does not exist',
}

export { ErrorMessage };
