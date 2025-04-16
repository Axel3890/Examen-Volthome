import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'books',
})
export class Book extends Model<Book> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    allowNull: false,
  })
  title: string;

  @Column({
    allowNull: false,
  })
  author_id: string;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  published_year: number;
}
