import { Injectable, InternalServerErrorException, ServiceUnavailableException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AuthorsService {
  async searchAuthors(query: string): Promise<any[]> {
    try {
      const url = `https://openlibrary.org/search/authors.json?q=${encodeURIComponent(query)}`;
      const response = await axios.get(url, {
        timeout: 5000,
      });

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
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const msg = error.response?.data?.error || error.message;

        if (status === 404) {
          throw new InternalServerErrorException('No se encontraron resultados');
        }

        console.error('Error al consultar Open Library:', msg);
        throw new ServiceUnavailableException('No se pudo contactar con Open Library');
      }

      console.error('Error interno al buscar autores:', error);
      throw new InternalServerErrorException('Error interno al procesar la solicitud');
    }
  }
}
