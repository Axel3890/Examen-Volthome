import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './book.model';
import { CreateBookDto } from './dto/create-books-dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async findAll(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Book> {
    return this.booksService.findOne(id);
  }

  @Post()
  async create(
    @Body() createBookDto: CreateBookDto,
  ): Promise<Book> {
    return this.booksService.create(createBookDto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return this.booksService.remove(id);
  }

  @Get('grouped')
  async getGroupedBooks(): Promise<Record<string, Book[]>> {
    return this.booksService.findGrouped();
  }
}