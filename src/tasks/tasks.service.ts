import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskEntity } from '../entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly tasksRepository: Repository<TaskEntity>
  ) {}

  async getAllTasks(): Promise<TaskEntity[]> {
    try {
      return await this.tasksRepository.find({
        relations: [],
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getTAskById(id: string): Promise<TaskEntity> {
    try {
      return await this.tasksRepository.findOneOrFail(id, {
        relations: [],
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    }
  }

  async create(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    const { title, order, description, userId, boardId, columnId } =
      createTaskDto;
    const newTask = new TaskEntity();
    newTask.title = title;
    newTask.order = order;
    newTask.description = description;
    newTask.userId = userId;
    newTask.boardId = boardId;
    newTask.columnId = columnId;
    return await this.tasksRepository.save(newTask);
  }

  async updateTask(updateUserDto: UpdateTaskDto, id: string) {
    try {
      const { title, order, description, userId, boardId, columnId } =
        updateUserDto;
      return await this.tasksRepository.update(id, {
        title,
        order,
        description,
        userId,
        boardId,
        columnId,
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteTaskById(userId: string) {
    return await this.tasksRepository
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
