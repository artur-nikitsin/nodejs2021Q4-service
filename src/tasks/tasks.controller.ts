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
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Auth } from '../auth/auth.decorator';

@Controller('/boards/:boardId/')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('/tasks')
  @Auth()
  create(@Body() createTAskDto: CreateTaskDto) {
    return this.tasksService.create(createTAskDto);
  }

  @Get('/tasks')
  @Auth()
  getAllTasks(@Query() query: string) {
    return this.tasksService.getAllTasks();
  }

  @Get('/tasks/:taskId')
  @Auth()
  getTAskById(@Param('userId') userId: string) {
    return this.tasksService.getTAskById(userId);
  }

  @Put('/tasks/:taskId')
  @Auth()
  updateTask(
    @Body() updateTaskDto: UpdateTaskDto,
    @Param('taskId') taskId: string
  ) {
    return this.tasksService.updateTask(updateTaskDto, taskId);
  }

  @Delete('/tasks/:taskId')
  @Auth()
  deleteTaskById(@Param('taskId') taskId: string) {
    return this.tasksService.deleteTaskById(taskId);
  }
}
