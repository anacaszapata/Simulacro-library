import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSaleDto {
  @IsNotEmpty()
  @IsDate()
  @ApiProperty()
  transactionDate: Date;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  bookId: number;
}
