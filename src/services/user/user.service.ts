import {
  User as TUser,
  UserUpdateDTOPayload,
  UserUpdatePayload,
} from '../../common/types/types';
import { userRep } from '../../data/repositories/repositories';
import {
  ErrorMessage,
  HttpCode,
  UserPayloadKey,
} from '../../common/enums/enums';
import { encrypt, HttpError } from '../../helpers/helpers';
import { compare } from 'bcrypt';

type Constructor = {
  userRepository: typeof userRep;
};

class User {
  private userRepository: typeof userRep;

  constructor({ userRepository }: Constructor) {
    this.userRepository = userRepository;
  }

  public getAll(): Promise<TUser[]> {
    return this.userRepository.getAll();
  }

  public async getById(id: number): Promise<TUser> {
    const user = await this.userRepository.getById(id);
    if (!user) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: ErrorMessage.USER_NOT_FOUND,
      });
    }
    return user;
  }

  public async update(id: number, payload: UserUpdatePayload): Promise<TUser> {
    const {
      username,
      old_password,
      new_password,
      new_password_confirmation,
      class_id,
    } = payload;

    if (new_password !== new_password_confirmation) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: ErrorMessage.PASSWORDS_NOT_MATCH,
      });
    }

    const oldUser = await this.userRepository.getById(id);
    if (!oldUser) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: ErrorMessage.USER_NOT_FOUND,
      });
    }

    const hashOldPassword = await this.userRepository.getPassByEmail(
      oldUser.email,
    );
    const isOldPasswordsEqual = await compare(old_password, hashOldPassword);
    if (!isOldPasswordsEqual) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: ErrorMessage.OLD_PASSWORDS_NOT_MATCH,
      });
    }

    const updateUser: UserUpdateDTOPayload = {
      username,
      password: await encrypt(new_password),
      class_id,
    };

    const user = await this.userRepository.update(id, updateUser);
    return user;
  }
}
export { User };
