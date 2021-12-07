import { v4 } from 'uuid';

interface User {
  id: string;
  name: string;
  login: string;
  password: string;
}

class User {
  constructor({ name = 'name', login = 'login', password = 'password' } = {}) {
    this.id = v4.uuidv4();
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
