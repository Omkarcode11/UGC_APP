import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Campaign } from './Campaign';
import { Application } from './Application';

@Table
export class User extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id!: string;

  @Column(DataType.STRING)
  name!: string;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  email!: string;

  @Column(DataType.STRING)
  passwordHash!: string;

  @Column(DataType.ENUM('BRAND', 'CREATOR'))
  role!: 'BRAND' | 'CREATOR';

  @HasMany(() => Campaign)
  campaigns!: Campaign[];

  @HasMany(() => Application)
  applications!: Application[];
}
