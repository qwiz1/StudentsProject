import Joi from 'joi';
import {
  UserPayloadKey,
  UserValidationMessage,
  UserValidationRule,
} from '../../../common/enums/enums';

const userUpdate = Joi.object({
  [UserPayloadKey.USERNAME]: Joi.string()
    .trim()
    .min(UserValidationRule.USERNAME_MIN_LENGTH)
    .max(UserValidationRule.USERNAME_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': UserValidationMessage.USERNAME_REQUIRE,
      'string.min': UserValidationMessage.USERNAME_MIN_LENGTH,
      'string.max': UserValidationMessage.USERNAME_MAX_LENGTH,
    }),
  [UserPayloadKey.CLASS_ID]: Joi.number().integer().required(),
  [UserPayloadKey.OLD_PASSWORD]: Joi.string()
    .trim()
    .min(UserValidationRule.PASSWORD_MIN_LENGTH)
    .max(UserValidationRule.PASSWORD_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': UserValidationMessage.PASSWORD_REQUIRE,
      'string.min': UserValidationMessage.PASSWORD_MIN_LENGTH,
      'string.max': UserValidationMessage.PASSWORD_MAX_LENGTH,
    }),
  [UserPayloadKey.NEW_PASSWORD]: Joi.string()
    .trim()
    .min(UserValidationRule.PASSWORD_MIN_LENGTH)
    .max(UserValidationRule.PASSWORD_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': UserValidationMessage.PASSWORD_CONFIRMATION_REQUIRE,
      'string.min': UserValidationMessage.PASSWORD_MIN_LENGTH,
      'string.max': UserValidationMessage.PASSWORD_MAX_LENGTH,
    }),
  [UserPayloadKey.NEW_PASSWORD_CONFIRMATION]: Joi.string()
    .trim()
    .min(UserValidationRule.PASSWORD_MIN_LENGTH)
    .max(UserValidationRule.PASSWORD_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': UserValidationMessage.PASSWORD_CONFIRMATION_REQUIRE,
      'string.min': UserValidationMessage.PASSWORD_MIN_LENGTH,
      'string.max': UserValidationMessage.PASSWORD_MAX_LENGTH,
    }),
});

export { userUpdate };
