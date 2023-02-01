import { UserPayloadKey } from '../../enums/enums';

type UserUpdateDTOPayload = {
  [UserPayloadKey.USERNAME]: string;
  [UserPayloadKey.PASSWORD]: string;
  [UserPayloadKey.CLASS_ID]: number;
};

export type { UserUpdateDTOPayload };
