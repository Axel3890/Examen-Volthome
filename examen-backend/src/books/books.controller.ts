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
  // Devuelve todos los libros sin filtros
  async findAll(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @Get('grouped')
  // Agrupa los libros por década y los ordena por título
  async getGroupedBooks(): Promise<Record<string, Book[]>> {
    return this.booksService.findGrouped();
  }

  @Get(':id')
  // Busca un libro por ID, lanza error si no existe
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Book> {
    return this.booksService.findOne(id);
  }

  @Post()
  // Crea un nuevo libro a partir del DTO recibido
  async create(
    @Body() createBookDto: CreateBookDto,
  ): Promise<Book> {
    return this.booksService.create(createBookDto);
  }

  @Put(':id')
  // Actualiza un libro existente por ID
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  // Elimina un libro por ID
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return this.booksService.remove(id);
  }
}
