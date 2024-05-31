import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Sale } from '../../sales/entities/sale.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  email: string;

  @OneToMany(() => Sale, (sale) => sale.user)
  @ApiProperty({ type: () => Sale, isArray: true })
  sales: Sale[];
}
