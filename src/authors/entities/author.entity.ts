import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Book } from '../../books/entities/book.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @OneToMany(() => Book, (book) => book.author)
  books: Book[];
}
