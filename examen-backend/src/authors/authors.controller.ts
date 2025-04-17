import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { AuthorsService } from './authors.service';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  async search(@Query('search') search: string) {
    if (!search) {
      throw new BadRequestException('El parámetro search es requerido');
    }
    return this.authorsService.searchAuthors(search);
  }
}
