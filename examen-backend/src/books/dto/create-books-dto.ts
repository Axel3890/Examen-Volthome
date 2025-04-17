import { IsString, IsNotEmpty, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @Type(() => Number)
  @IsInt()
  @Min(1500)
  @Max(new Date().getFullYear())
  published_year: number;
}