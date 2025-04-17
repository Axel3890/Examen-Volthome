import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AuthorsService {
  async searchAuthors(query: string): Promise<any[]> {
    try {
      const response = await axios.get(
        `https://openlibrary.org/search/authors.json?q=${encodeURIComponent(query)}`,
      );

      const authors = response.data?.docs.slice(0, 5).map((doc) => ({
        id: doc.key,
        name: doc.name,
        top_work: doc.top_work,
        work_count: doc.work_count,
      }));
      return authors;
    } catch (error) {
      throw new Error('Error al consultar la API de Open Library');
    }
  }
}
