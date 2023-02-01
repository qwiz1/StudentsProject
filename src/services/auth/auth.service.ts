import { UserCreatePayload } from '../../common/types/user/user-create-payload.type';
import { userRep } from '../../data/repositories/repositories';
import { User as TUser } from '../../common/types/types';
import { compare } from 'bcrypt';
import { encrypt, HttpError } from '../../helpers/helpers';
import jwt from 'jsonwebtoken';
import { ENV, ErrorMessage, HttpCode } from '../../common/enums/enums';

type SignRes = {
  token: string;
  user: TUser;
};

type UserSignInPayload = {
  email: string;
  password: string;
};

type Constructor = {
  userRepository: typeof userRep;
};

class Auth {
  private userRepository: typeof userRep;

  constructor({ userRepository }: Constructor) {
    this.userRepository = userRepository;
  }

  public async signUp(payload: UserCreatePayload): Promise<SignRes> {
    const { password, password_confirmation } = payload;
    if (password !== password_confirmation) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: ErrorMessage.PASSWORDS_NOT_MATCH,
      });
    }

    const user = await this.userRepository.create({
      ...payload,
      password: await encrypt(password),
    });

    const token = jwt.sign({ userId: user.id }, ENV.JWT.SECRET as string, {});

    return {
      token,
      user,
    };
  }

  public async signIn(payload: UserSignInPayload): Promise<SignRes> {
    const { email, password } = payload;
    const user = await this.userRepository.getByEmail(email);
    const hasUser = Boolean(user);

    if (!hasUser) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: ErrorMessage.EMAIL_DOES_NOT_EXIST,
      });
    }

    const hashPassword = await this.userRepository.getPassByEmail(email);
    const isCryptsEqual = await compare(password, hashPassword);

    if (!isCryptsEqual) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: ErrorMessage.WRONG_PASSWORD,
      });
    }

    const token = jwt.sign({ userId: user.id }, ENV.JWT.SECRET as string, {});

    return {
      token,
      user,
    };
  }
}

export { Auth };
