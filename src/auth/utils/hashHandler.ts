import { CredentialsType } from '../login.controller';
import app from '../../app';

export const hashCreate = async (password: CredentialsType['password']) => {
  return await app.bcrypt.hash(password);
};

export const hashCheck = async (
  password: CredentialsType['password'],
  hash: string
) =>
  app.bcrypt
    .compare(password, hash)
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
