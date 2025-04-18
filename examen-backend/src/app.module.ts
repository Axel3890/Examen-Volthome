import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { BooksModule } from './books/books.module';
import { AuthorsModule } from './authors/authors.module';

@Module({
  imports: [
    // Configura variables de entorno y las hace accesibles globalmente
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Configura Sequelize de forma asíncrona usando variables de entorno
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: parseInt(configService.get<string>('DB_PORT')),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadModels: true, // Carga automática de modelos registrados
        synchronize: true,    // Sincroniza el schema (solo para desarrollo)
      }),
    }),

    // Importa los módulos de libros y autores
    BooksModule,
    AuthorsModule,
  ],
})
export class AppModule {}
