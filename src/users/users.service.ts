import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from '../resources/users/user.entity';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>
  ) {}

  async getAllUsers(): Promise<UserEntity[]> {
    try {
      return await this.usersRepository.find({
        relations: [],
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getUserById(id: string): Promise<UserEntity> {
    try {
      return await this.usersRepository.findOneOrFail(id, {
        relations: ['manager', 'roles', 'groups'],
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    }
  }

  async getUserByLogin(login: string) {
    return await getRepository(UserEntity)
      .createQueryBuilder('user')
      .where('user.login = :login', { login })
      .getOne();
  }

  async create(
    createUserDto: CreateUserDto
  ): Promise<{ id: string; name: string; login: string }> {
    const { name, login, password } = createUserDto;
    const newUser = new UserEntity();
    newUser.login = login;
    newUser.name = name;
    newUser.password = await bcryptjs.hash(password, 8);
    await this.usersRepository.save(newUser);
    return UserEntity.toResponse(newUser);
  }

  async updateUser(updateUserDto: UpdateUserDto, id: string) {
    try {
      const { name, login, password } = updateUserDto;
      const newPassword = await bcryptjs.hash(password, 8);
      return await this.usersRepository.update(id, {
        name,
        login,
        password: newPassword,
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteUserById(userId: string) {
    console.log('@@@@@@@', userId);
    return await this.usersRepository
      .delete(userId)
      .then(async (deletedResult) => {
        if (deletedResult.raw.serverStatus === 2) {
          return {
            status: 200,
            message: `User with id ${userId} successfully deleted`,
          };
        }
      });
  }
}
