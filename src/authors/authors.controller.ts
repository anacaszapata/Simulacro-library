import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Authors')
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @ApiOperation({ summary: 'Create a new author' })
  @ApiResponse({
    status: 201,
    description: 'The author has been successfully created',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorsService.create(createAuthorDto);
  }

  @ApiOperation({ summary: 'Get all Authors' })
  @ApiResponse({ status: 200, description: 'Returns all authors' })
  @Get()
  findAll() {
    return this.authorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authorsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorsService.update(+id, updateAuthorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authorsService.remove(+id);
  }
}
