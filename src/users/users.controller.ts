import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Auth } from '../auth/auth.decorator';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Auth()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Auth()
  getAllUsers(@Query() query: string) {
    return this.usersService.getAllUsers();
  }

  @Get('/getbyid/:id')
  @Auth()
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Patch('update/:id')
  @Auth()
  updateUser(@Body() updateUserDto: UpdateUserDto, @Param('id') id: string) {
    return this.usersService.updateUser(updateUserDto, id);
  }

  @Delete('/delete-inactive-user/:id')
  @Auth()
  deleteInactiveUser(@Param('id') userId: string) {
    return this.usersService.deleteUserById(userId);
  }
}
