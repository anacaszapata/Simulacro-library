import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { AuthorsService } from '../authors/authors.service';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly booksRepository: Repository<Book>,
    private readonly authorsService: AuthorsService,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const author = await this.authorsService.findOne(createBookDto.authorId);
    const book = this.booksRepository.create({ ...createBookDto, author });
    return this.booksRepository.save(book);
  }

  findAll(): Promise<Book[]> {
    return this.booksRepository.find({ relations: ['author'] });
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.booksRepository.findOne({ where: { id }, relations: ['author'] });
    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const author = await this.authorsService.findOne(updateBookDto.authorId);
    await this.booksRepository.update(id, { ...updateBookDto, author });
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.booksRepository.softDelete(id);
  }
}
