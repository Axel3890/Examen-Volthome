import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { AuthorsService } from './authors.service';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  async search(@Query('search') search: string) {
    // Validación básica del parámetro 'search'
    if (!search || typeof search !== 'string' || search.trim() === '') {
      throw new BadRequestException('El parámetro "search" es requerido y no puede estar vacío');
    }

    // Delegamos la lógica de búsqueda al servicio
    return this.authorsService.searchAuthors(search.trim());
  }
}
