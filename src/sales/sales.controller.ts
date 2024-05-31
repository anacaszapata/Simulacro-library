import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { TimeGuard } from '../guard/time.guard';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  @UseGuards(TimeGuard)
  create(@Body() createSaleDto: CreateSaleDto) {
    return this.salesService.create(createSaleDto);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.salesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salesService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salesService.remove(+id);
  }
}
