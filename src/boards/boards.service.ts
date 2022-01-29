import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardEntity } from '../entities/board.entity';
import { TasksService } from '../tasks/tasks.service';
import { ColumnsService } from '../columns/columns.service';
import { ColumnEntity } from '../entities/column.entity';
import { TaskEntity } from '../entities/task.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardEntity)
    private readonly boardsRepository: Repository<BoardEntity>,
    private readonly tasksService: TasksService,
    private readonly columnsService: ColumnsService
  ) {}

  async getAllBoards(): Promise<BoardEntity[]> {
    try {
      return await this.boardsRepository.find({
        relations: [],
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getBoardById(id: string): Promise<BoardEntity> {
    try {
      return await this.boardsRepository.findOneOrFail(id, {
        relations: [],
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    }
  }

  async create(createUserDto: CreateBoardDto): Promise<BoardEntity> {
    const { title, columns, tasks } = createUserDto;
    const newBoard = new BoardEntity();
    newBoard.title = title;
    if (columns && columns.length > 0) {
      newBoard.columns = await Promise.all(
        columns.map(async (column) => {
          return await this.columnsService.getOneById(column);
        })
      );
    }
    if (tasks && tasks.length > 0) {
      newBoard.tasks = await Promise.all(
        tasks.map(async (tasksId) => {
          return await this.tasksService.getTAskById(tasksId);
        })
      );
    }
    return await this.boardsRepository.save(newBoard);
  }

  async updateBoard(updateBoardDto: UpdateBoardDto, id: string) {
    try {
      const { title, columns, tasks } = updateBoardDto;

      let updatedColumns: (ColumnEntity | undefined)[] = [];
      let updatedTasks: TaskEntity[] = [];

      if (columns && columns.length > 0) {
        updatedColumns = await Promise.all(
          columns.map(async (column) => {
            return await this.columnsService.getOneById(column);
          })
        );
      }
      if (tasks && tasks.length > 0) {
        updatedTasks = await Promise.all(
          tasks.map(async (tasksId) => {
            return await this.tasksService.getTAskById(tasksId);
          })
        );
      }

      return await this.boardsRepository.update(id, {
        title: title,
        tasks: updatedTasks,
        columns: updatedColumns,
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteBoardById(boardId: string) {
    return await this.boardsRepository.delete(boardId);
  }
}
