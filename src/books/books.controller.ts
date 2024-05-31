import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ApiOperation({ summary: 'Create a new book' })
  @ApiResponse({
    status: 201,
    description: 'book has been successfully created',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @ApiOperation({ summary: 'Get all Books' })
  @ApiResponse({ status: 200, description: 'Returns all books' })
  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}
