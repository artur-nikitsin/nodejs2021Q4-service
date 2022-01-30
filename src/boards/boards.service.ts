import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardEntity } from '../entities/board.entity';
// import { TasksService } from '../tasks/tasks.service';
import { ColumnsService } from '../columns/columns.service';
import { ColumnEntity } from '../entities/column.entity';
// import { UserEntity } from '../resources/users/user.entity';
// import { ColumnEntity } from '../entities/column.entity';
// import { TaskEntity } from '../entities/task.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardEntity)
    private readonly boardsRepository: Repository<BoardEntity>,
    // private readonly tasksService: TasksService,
    private readonly columnsService: ColumnsService
  ) {}

  async getAllBoards(): Promise<BoardEntity[]> {
    try {
      return await this.boardsRepository.find({
        relations: ['columns'],
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getBoardById(id: string): Promise<BoardEntity> {
    try {
      return await this.boardsRepository.findOneOrFail(id, {
        relations: ['columns'],
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    }
  }

  async create(createBoardDto: CreateBoardDto): Promise<BoardEntity> {
    const { title, columns } = createBoardDto;
    const newBoard = new BoardEntity();
    newBoard.title = title;

    if (columns && columns.length > 0) {
      newBoard.columns = await Promise.all(
        columns.map(async (column) => {
          return await this.columnsService.createColumn(column);
        })
      );
    }
    // if (tasks && tasks.length > 0) {
    //   newBoard.tasks = await Promise.all(
    //     tasks.map(async (tasksId) => {
    //       return await this.tasksService.create(tasksId);
    //     })
    //   );
    // }
    return await this.boardsRepository.save(newBoard);
  }

  async updateBoard(updateBoardDto: UpdateBoardDto, boardId: string) {
    try {
      const { title, columns } = updateBoardDto;
      const prevBoard = await this.boardsRepository.findOne({
        where: { id: boardId },
        relations: ['columns'],
      });
      let updatedColumns: (ColumnEntity | undefined)[] = [];
      // const updatedTasks: TaskEntity[] = [];

      if (columns && columns.length > 0) {
        updatedColumns = await Promise.all(
          columns.map(async (column) => {
            const prevColumn = await this.columnsService.getOneById(column.id);
            if (prevColumn) {
              return this.columnsService.updateColumn({
                ...prevColumn,
                ...column,
              });
            } else {
              return await this.columnsService.createColumn(column);
            }
          })
        );
      }
      // if (tasks && tasks.length > 0) {
      //   updatedTasks = await Promise.all(
      //     tasks.map(async (tasksId) => {
      //       return await this.tasksService.getTAskById(tasksId);
      //     })
      //   );
      // }

      return await this.boardsRepository.save({
        ...prevBoard,
        title: title,
        columns: updatedColumns,
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteBoardById(boardId: string) {
    return await this.boardsRepository
      .createQueryBuilder()
      .delete()
      .from(BoardEntity)
      .where('id = :boardId', { boardId: boardId })
      .execute();
  }
}
