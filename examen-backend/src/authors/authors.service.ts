import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AuthorsService {
  async searchAuthors(query: string): Promise<any[]> {
    try {
      const url = `https://openlibrary.org/search/authors.json?q=${encodeURIComponent(query)}`;
      const response = await axios.get(url);
      const docs = response.data?.docs;

      if (!Array.isArray(docs)) {
        throw new InternalServerErrorException('Respuesta inesperada de Open Library');
      }

      return docs.slice(0, 5).map((doc) => ({
        id: doc.key,
        name: doc.name,
        top_work: doc.top_work ?? null,
        work_count: doc.work_count ?? 0,
      }));
    } catch (error) {
      console.error('Error al consultar Open Library:', error?.message || error);
      throw new InternalServerErrorException('Error al consultar la API de Open Library');
    }
  }
}
