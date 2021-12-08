// @ts-ignore
import { v4 } from 'uuid';

interface UserInterface {
  id: string;
  name: string;
  login: string;
  password: string;
}

class User implements UserInterface {
  public id: string;
  public name: string;
  public login: string;
  public password: string;

  constructor({ name = 'name', login = 'login', password = 'password' } = {}) {
    this.id = v4();
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user: User) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export default User;
