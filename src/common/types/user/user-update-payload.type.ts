import { UserPayloadKey } from '../../enums/user/user-payload-key.enum';

type UserUpdatePayload = {
  [UserPayloadKey.USERNAME]: string;
  [UserPayloadKey.OLD_PASSWORD]: string;
  [UserPayloadKey.NEW_PASSWORD]: string;
  [UserPayloadKey.NEW_PASSWORD_CONFIRMATION]: string;
  [UserPayloadKey.CLASS_ID]: number;
};

export { UserUpdatePayload };
