import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColumnEntity } from '../entities/column.entity';
import Column from '../resources/columns/column.model';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectRepository(ColumnEntity)
    private readonly columnsRepository: Repository<ColumnEntity>
  ) {}

  async getOneByTitle(title: string) {
    return await this.columnsRepository
      .createQueryBuilder()
      .where('title = :title', { title })
      .getOne();
  }

  async getOneById(columnId: string) {
    return await this.columnsRepository.findOne(columnId);
  }

  async createColumn(columnData: Column) {
    const { title, order } = columnData;
    const newColumn = new ColumnEntity();
    newColumn.title = title;
    newColumn.order = order;
    return await this.columnsRepository.save(newColumn);
  }

  async updateColumn(columnData: Column) {
    return await this.columnsRepository.save(columnData);
  }
}
