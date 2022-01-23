import jwt from 'jsonwebtoken';
import userMemoryRepository from '../resources/users/user.memory.repository';
import { hashCheck } from './utils/hashHandler';
import { CredentialsType } from './login.controller';
import { UserEntity } from '../resources/users/user.entity';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export const getSignToken = async (
  userLogin: CredentialsType['login'],
  password: CredentialsType['password']
) => {
  try {
    const user: UserEntity | undefined =
      await userMemoryRepository.getUserByLogin(userLogin);
    if (!user) {
      throw new Error();
    }
    const { password: hashPassport } = user;
    const isPasswordRight = await hashCheck(password, hashPassport);
    if (isPasswordRight) {
      const { id, login } = user;
      const token = jwt.sign({ id, login }, JWT_SECRET_KEY as string, {
        expiresIn: '10m',
      });
      return token;
    }
    throw new Error();
  } catch {
    return null;
  }
};
