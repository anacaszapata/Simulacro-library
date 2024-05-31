import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  name?: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty()
  email?: string;
}
