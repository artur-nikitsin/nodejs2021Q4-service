import jwt from 'jsonwebtoken';
import userMemoryRepository from '../resources/users/user.memory.repository';
import { decryptPassword } from './utils/cryptUtils';
import { UserEntity } from '../resources/users/user.entity';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export const getToken = async (userLogin: string, password: string) => {
  try {
    const user: UserEntity | undefined =
      await userMemoryRepository.getUserByLogin(userLogin);
    if (!user) {
      throw new Error(`User with login ${userLogin} not found`);
    }
    const { password: cryptPassword } = user;
    const isPasswordCorrect = await decryptPassword(password, cryptPassword);
    if (isPasswordCorrect) {
      const { id, login } = user;
      return jwt.sign({ id, login }, JWT_SECRET_KEY as string, {
        expiresIn: '20m',
      });
    }
    throw new Error(`Incorrect password for user with login ${userLogin}`);
  } catch (error) {
    return error;
  }
};
