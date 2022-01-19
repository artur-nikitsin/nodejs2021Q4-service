import { getRepository } from 'typeorm';
import { BoardEntity } from '../boards/board.entity';
import Column from './column.model';
import { ColumnEntity } from './column.entity';

const getOneByTitle = async (title: string) => {
  return await getRepository(BoardEntity)
    .createQueryBuilder()
    .where('title = :title', { title })
    .getOne();
};

const getOneById = async (columnId: string) => {
  return await getRepository(ColumnEntity).findOne(columnId);
};

const createColumn = async (columnData: Column) => {
  const { title, order } = columnData;
  const newColumn = new ColumnEntity();
  newColumn.title = title;
  newColumn.order = order;
  return await getRepository(ColumnEntity).save(newColumn);
};

const updateColumn = async (columnData: Column) => {
  return await getRepository(ColumnEntity).save(columnData);
};

export default { getOneByTitle, getOneById, createColumn, updateColumn };
