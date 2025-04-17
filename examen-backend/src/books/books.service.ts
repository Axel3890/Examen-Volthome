import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ValidationError, UniqueConstraintError } from 'sequelize';
import { Book } from './book.model';
import { CreateBookDto } from './dto/create-books-dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book)
    private bookModel: typeof Book,
  ) {}

  async findAll(): Promise<Book[]> {
    return this.bookModel.findAll();
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.bookModel.findByPk(id);
    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    return book;
  }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    try {
      return await this.bookModel.create(createBookDto);
    } catch (error) {
      if (
        error instanceof ValidationError ||
        error instanceof UniqueConstraintError
      ) {
        throw new BadRequestException(
          error.errors.map((e) => e.message).join('; '),
        );
      }
      throw error;
    }
  }

  async update(
    id: number,
    updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    const book = await this.findOne(id);
    try {
      return await book.update(updateBookDto);
    } catch (error) {
      if (
        error instanceof ValidationError ||
        error instanceof UniqueConstraintError
      ) {
        throw new BadRequestException(
          error.errors.map((e) => e.message).join('; '),
        );
      }
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    const book = await this.findOne(id);
    await book.destroy();
  }

  async findGrouped(): Promise<Record<string, Book[]>> {
    const books = await this.findAll();
    const grouped = books.reduce((acc, book) => {
      const decade = getDecade(book.published_year);
      acc[decade] = acc[decade] || [];
      acc[decade].push(book);
      return acc;
    }, {} as Record<string, Book[]>);

    Object.keys(grouped).forEach((decade) => {
      grouped[decade].sort((a, b) =>
        a.title.localeCompare(b.title, undefined, { sensitivity: 'base' }),
      );
    });

    return grouped;
  }
}

function getDecade(year: number): string {
  const decadeStart = Math.floor(year / 10) * 10;
  return `${decadeStart}s`;
}
  