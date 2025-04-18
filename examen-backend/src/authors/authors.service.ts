import { Injectable, InternalServerErrorException, ServiceUnavailableException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AuthorsService {
  async searchAuthors(query: string): Promise<any[]> {
    try {
      // Consulta a la API de Open Library con el término de búsqueda
      const url = `https://openlibrary.org/search/authors.json?q=${encodeURIComponent(query)}`;
      const response = await axios.get(url);

      const docs = response.data?.docs;

      // Validación de estructura esperada
      if (!Array.isArray(docs)) {
        throw new InternalServerErrorException('Respuesta inesperada de Open Library');
      }

      // Transformamos y devolvemos los primeros 5 resultados
      return docs.slice(0, 5).map((doc) => ({
        id: doc.key,
        name: doc.name,
        top_work: doc.top_work ?? null,
        work_count: doc.work_count ?? 0,
      }));

    } catch (error) {
      // Manejo de errores específicos de Axios
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const msg = error.response?.data?.error || error.message;

        if (status === 404) {
          throw new InternalServerErrorException('No se encontraron resultados');
        }

        console.error('Error al consultar Open Library:', msg);
        throw new ServiceUnavailableException('No se pudo contactar con Open Library');
      }

      // Manejo de otros errores no relacionados con Axios
      console.error('Error interno al buscar autores:', error);
      throw new InternalServerErrorException('Error interno al procesar la solicitud');
    }
  }
}
