import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Application } from "./Application";

@Table
export class Submission extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id!: string;

  @ForeignKey(() => Application)
  @Column(DataType.UUID)
  applicationId!: string;

  @BelongsTo(() => Application)
  application!: Application;

  @Column(DataType.STRING)
  contentUrl!: string;

  @Column(DataType.ENUM("PENDING", "APPROVED", "REJECTED"))
  status!: "PENDING" | "APPROVED" | "REJECTED";

  @Column(DataType.DATE)
  submittedAt!: Date;
}
