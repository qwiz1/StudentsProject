import { compare } from 'bcrypt';

const isCryptsEqual = (data: string, encrypted: string): Promise<boolean> => {
  return compare(data, encrypted);
};

export { isCryptsEqual };
