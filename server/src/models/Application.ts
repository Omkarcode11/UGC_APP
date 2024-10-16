import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasOne } from 'sequelize-typescript';
import { User } from './User';
import { Campaign } from './Campaign';
import { Submission } from './Submission';

@Table
export class Application extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id!: string;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  creatorId!: string;

  @BelongsTo(() => User)
  creator!: User;

  @ForeignKey(() => Campaign)
  @Column(DataType.UUID)
  campaignId!: string;

  @BelongsTo(() => Campaign)
  campaign!: Campaign;

  @Column(DataType.ENUM('PENDING', 'APPROVED', 'REJECTED'))
  status!: 'PENDING' | 'APPROVED' | 'REJECTED';

  @Column(DataType.DATE)
  submittedAt!: Date;

  @HasOne(() => Submission)
  submission!: Submission;
}
