import { Auth } from './auth/auth.service';
import { User } from './user/user.service';
import { userRep as userRepository } from '../data/repositories/repositories';

const auth = new Auth({
  userRepository,
});

const user = new User({
  userRepository,
});

export { Socket } from './socket/socket.service';
export { auth, user };
