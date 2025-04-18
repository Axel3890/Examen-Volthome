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

  // Devuelve todos los libros almacenados
  async findAll(): Promise<Book[]> {
    return this.bookModel.findAll();
  }

  // Busca un libro por ID, lanza 404 si no lo encuentra
  async findOne(id: number): Promise<Book> {
    const book = await this.bookModel.findByPk(id);
    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    return book;
  }

  // Crea un nuevo libro y maneja errores de validación
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

  // Actualiza un libro existente y maneja errores de validación
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

  // Elimina un libro si existe
  async remove(id: number): Promise<void> {
    const book = await this.findOne(id);
    await book.destroy();
  }

  // Agrupa los libros por década según su año de publicación
  async findGrouped(): Promise<Record<string, Book[]>> {
    const books = await this.findAll();
    const grouped = books.reduce((acc, book) => {
      const decade = getDecade(book.published_year);
      acc[decade] = acc[decade] || [];
      acc[decade].push(book);
      return acc;
    }, {} as Record<string, Book[]>);

    // Ordena alfabéticamente los libros dentro de cada grupo
    Object.keys(grouped).forEach((decade) => {
      grouped[decade].sort((a, b) =>
        a.title.localeCompare(b.title, undefined, { sensitivity: 'base' }),
      );
    });

    return grouped;
  }
}

// Devuelve la década a la que pertenece un año (ej: 1990s, 2000s)
function getDecade(year: number): string {
  const decadeStart = Math.floor(year / 10) * 10;
  return `${decadeStart}s`;
}
