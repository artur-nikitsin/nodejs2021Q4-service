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

@Controller('/boards')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('/:boardId/tasks')
  @Auth()
  create(
    @Body() createTAskDto: CreateTaskDto,
    @Param('boardId') boardId: string
  ) {
    return this.tasksService.create(createTAskDto, boardId);
  }

  @Get('/:boardId/tasks')
  @Auth()
  getAllTasks(@Query() query: string) {
    return this.tasksService.getAllTasks();
  }

  @Get('/:boardId/tasks/:taskId')
  @Auth()
  getTAskById(@Param('taskId') taskId: string) {
    return this.tasksService.getTaskById(taskId);
  }

  @Put('/:boardId/tasks/:taskId')
  @Auth()
  updateTask(
    @Body() updateTaskDto: UpdateTaskDto,
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string
  ) {
    return this.tasksService.updateTask(updateTaskDto, taskId, boardId);
  }

  @Delete('/:boardId/tasks/:taskId')
  @Auth()
  deleteTaskById(@Param('taskId') taskId: string) {
    return this.tasksService.deleteTaskById(taskId);
  }
}
