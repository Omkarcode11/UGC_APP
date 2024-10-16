import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { User } from "./User";
import { Application } from "./Application";

@Table
export class Campaign extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id!: string;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  brandId!: string;

  @BelongsTo(() => User)
  brand!: User;

  @Column(DataType.STRING)
  title!: string;

  @Column(DataType.TEXT)
  description!: string;

  @Column(DataType.DATE)
  deadline!: Date;

  @HasMany(() => Application)
  applications!: Application[];
}
