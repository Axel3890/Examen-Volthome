import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Book } from "./book.model";
import { CreateBookDto} from "./dto/create-books-dto";
import { UpdateBookDto } from "./dto/update-book.dto";

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
      throw new NotFoundException(`Libro con id ${id} no encontrado`);
    }
    return book;
  }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    return this.bookModel.create(createBookDto);
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await this.findOne(id);
    return book.update(updateBookDto);
  }

  async remove(id: number): Promise<void> {
    const book = await this.findOne(id);
    await book.destroy();
  }

  async findGrouped(): Promise<Record<string, Book[]>> {
    const books = await this.findAll();
  
    const grouped = books.reduce((acc, book) => {
      const decade = getDecade(book.published_year);
      if (!acc[decade]) {
        acc[decade] = [];
      }
      acc[decade].push(book);
      return acc;
    }, {} as Record<string, Book[]>);
  
    Object.keys(grouped).forEach((decade) => {
      grouped[decade].sort((a, b) =>
        a.title.toLowerCase().localeCompare(b.title.toLowerCase()),
      );
    });
  
    return grouped;
  }
 } 

  function getDecade(year: number): string {
    const decadeStart = Math.floor(year / 10) * 10;
    return `${decadeStart}s`;
  }
  