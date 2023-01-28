import { UserPayloadKey } from '../../enums/user/user-payload-key.enum';

type UserCreatePayload = {
  [UserPayloadKey.USERNAME]: string;
  [UserPayloadKey.EMAIL]: string;
  [UserPayloadKey.CLASS_ID]: number;
  [UserPayloadKey.PASSWORD]: string;
  [UserPayloadKey.PASSWORD_CONFIRMATION]: string;
};

export { UserCreatePayload };
