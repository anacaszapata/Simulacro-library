import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Author } from '../../authors/entities/author.entity';
import { Sale } from '../../sales/entities/sale.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  title: string;

  @ManyToOne(() => Author, (author) => author.books)
  @ApiProperty({ type: () => Author })
  author: Author;

  @OneToMany(() => Sale, (sale) => sale.book)
  @ApiProperty({ type: () => [Sale] })
  sales: Sale[];
}
