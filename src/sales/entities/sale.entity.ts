import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Book } from '../../books/entities/book.entity';
import { User } from '../../users/entities/user.entity'; // Asegúrate de importar la entidad User
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  transactionDate: Date;

  @ManyToOne(() => Book, (book) => book.sales, { onDelete: 'CASCADE' })
  @ApiProperty({ type: () => Book })
  book: Book;

  @ManyToOne(() => User, (user) => user.sales, { onDelete: 'CASCADE' })
  @ApiProperty({ type: () => User })
  user: User;
}
