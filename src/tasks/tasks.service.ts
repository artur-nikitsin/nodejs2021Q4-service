import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskEntity } from '../entities/task.entity';
import { BoardsService } from '../boards/boards.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly tasksRepository: Repository<TaskEntity>,
    private readonly boardService: BoardsService
  ) {}

  async getAllTasks(): Promise<TaskEntity[]> {
    try {
      return await this.tasksRepository.find({
        relations: ['column'],
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getTaskById(id: string): Promise<TaskEntity> {
    try {
      return await this.tasksRepository.findOneOrFail(id, {
        relations: ['column'],
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    }
  }

  async create(
    createTaskDto: CreateTaskDto,
    boardId: string
  ): Promise<TaskEntity> {
    const { title, order, description, userId, columnId } = createTaskDto;
    const newTask = new TaskEntity();
    newTask.title = title;
    newTask.order = order;
    newTask.description = description;
    newTask.userId = userId;
    newTask.boardId = boardId;
    newTask.columnId = columnId;

    return await this.tasksRepository.save(newTask);
  }

  async updateTask(
    updateTaskDto: UpdateTaskDto,
    taskId: string,
    boardId: string
  ) {
    try {
      const { title, order, description, userId, columnId } = updateTaskDto;
      const prevTask = await this.tasksRepository.findOne(taskId);

      if (prevTask) {
        if (prevTask) {
          prevTask.title = title;
          prevTask.order = order;
          prevTask.description = description;
          prevTask.userId = userId;
          prevTask.boardId = boardId;
          prevTask.columnId = columnId;

          if (boardId) {
            const board = await this.boardService.getBoardById(boardId);
            if (board) {
              prevTask.board = board;
            }
          } else {
            prevTask.boardId = null;
          }
        }

        return await this.tasksRepository.save(prevTask);
      }
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteTaskById(userId: string) {
    return await this.tasksRepository.delete(userId);
  }
}
