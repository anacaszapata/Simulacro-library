import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './entities/sale.entity';
import { CreateSaleDto } from './dto/create-sale.dto';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private salesRepository: Repository<Sale>,
  ) {}

  create(createSaleDto: CreateSaleDto): Promise<Sale> {
    const sale = this.salesRepository.create(createSaleDto);
    return this.salesRepository.save(sale);
  }

  findAll(query: any): Promise<Sale[]> {
    const {
      page = 1,
      limit = 10,
      sortField = 'date',
      sortOrder = 'ASC',
      startDate,
      endDate,
    } = query;

    const queryBuilder = this.salesRepository.createQueryBuilder('sale')
      .leftJoinAndSelect('sale.book', 'book')
      .leftJoinAndSelect('sale.customer', 'customer')
      .orderBy(`sale.${sortField}`, sortOrder)
      .skip((page - 1) * limit)
      .take(limit);

    if (startDate) {
      queryBuilder.andWhere('sale.date >= :startDate', { startDate });
    }

    if (endDate) {
      queryBuilder.andWhere('sale.date <= :endDate', { endDate });
    }

    return queryBuilder.getMany();
  }

  async findOne(id: number): Promise<Sale> {
    const sale = await this.salesRepository.findOne({ where: { id }, relations: ['book', 'customer'] });
    if (!sale) {
      throw new NotFoundException(`Sale with id ${id} not found`);
    }
    return sale;
  }

  async remove(id: number): Promise<void> {
    await this.salesRepository.softDelete(id);
  }
}
