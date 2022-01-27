import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

import { UpdateUserDto } from './dto/update-user.dto';
import User from '../resources/users/user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  async getAllUsers(): Promise<User[]> {
    try {
      return await this.usersRepository.find({
        relations: [],
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getUserById(id: string): Promise<User> {
    try {
      return await this.usersRepository.findOneOrFail(id, {
        relations: ['manager', 'roles', 'groups'],
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    }
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.usersRepository.save({});
  }

  async updateUser(updateUserDto: UpdateUserDto, id: string) {
    try {
      // const { firstname, lastname, email, role, isActive, managerId } =
      //   updateUserDto;
      return await this.usersRepository.update(id, {});
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteUserById(userId: string) {
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
