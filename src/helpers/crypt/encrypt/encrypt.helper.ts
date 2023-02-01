import { hash } from 'bcrypt';

const SALT_ROUNDS = 10;
const encrypt = (data: string): Promise<string> => {
  return hash(data, SALT_ROUNDS);
};

export { encrypt };
