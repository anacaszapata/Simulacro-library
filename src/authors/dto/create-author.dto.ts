import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateAuthorDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}
