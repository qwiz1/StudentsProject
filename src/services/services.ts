import { Auth } from './auth/auth.service';
import { userRep as userRepository } from '../data/repositories/repositories';

const auth = new Auth({
  userRepository,
});

export { Socket } from './socket/socket.service';
export { auth };
