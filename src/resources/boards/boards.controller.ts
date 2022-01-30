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
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

import { Auth } from '../auth/auth.decorator';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  @Auth()
  create(@Body() createUserDto: CreateBoardDto) {
    return this.boardsService.create(createUserDto);
  }

  @Get()
  @Auth()
  getAllBoards(@Query() query: string) {
    return this.boardsService.getAllBoards();
  }

  @Get('/:boardId')
  @Auth()
  getBoardById(@Param('boardId') boardId: string) {
    return this.boardsService.getBoardById(boardId);
  }

  @Put('/:boardId')
  @Auth()
  updateBoard(
    @Body() updateBoardDto: UpdateBoardDto,
    @Param('boardId') boardId: string
  ) {
    return this.boardsService.updateBoard(updateBoardDto, boardId);
  }

  @Delete('/:boardId')
  @Auth()
  deleteBoardById(@Param('boardId') boardId: string) {
    return this.boardsService.deleteBoardById(boardId);
  }
}
