import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BooksModule } from './books/books.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'tu_usuario',
      password: 'tu_contraseña',
      database: 'tu_basedatos',
      autoLoadModels: true,
      synchronize: true,
    }),
    BooksModule,

  ],
})
export class AppModule {}
