import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
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

  @Get('/users/:userId')
  @Auth()
  getUserById(@Param('userId') userId: string) {
    return this.usersService.getUserById(userId);
  }

  @Put('/users/:userId')
  @Auth()
  updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @Param('userId') userId: string
  ) {
    return this.usersService.updateUser(updateUserDto, userId);
  }

  @Delete('/users/:userId')
  @Auth()
  deleteInactiveUser(@Param('userId') userId: string) {
    return this.usersService.deleteUserById(userId);
  }
}
