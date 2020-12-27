import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BasicData } from '../shared/entities/basic-data.entity';
import { IsString } from 'class-validator';
import { Exclude } from 'class-transformer';

@Entity()
export class Account extends BasicData {

  @PrimaryGeneratedColumn({ type: 'int8' })
  account_owner_id: number;

  @IsString()
  @Column({ nullable: false })
  account_owner_name: string;

  @IsString()
  @Column({ nullable: false, unique: true })
  account_owner_email: string;

  @IsString()
  @Exclude()
  @Column({ nullable: true, select: false })
  account_owner_password: string;

  @IsString()
  @Column({ nullable: true })
  account_owner_tel: string;

  @Column({ type: 'timestamptz', nullable: true })
  subscription_start_date?: Date;

  @Column({ type: 'timestamptz', nullable: true })
  subscription_end_date?: Date;

  @IsString()
  @Column({ nullable: true })
  account_gender: string;
}