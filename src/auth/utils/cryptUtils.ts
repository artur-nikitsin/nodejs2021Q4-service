import app from '../../app';
import { CredentialsType } from '../auth.router';

export const encryptPassword = async (
  password: CredentialsType['password']
) => {
  return await app.bcrypt.hash(password);
};

export const decryptPassword = async (
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
