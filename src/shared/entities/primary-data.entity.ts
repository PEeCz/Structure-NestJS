import { BasicData } from './basic-data.entity';
import { PrimaryGeneratedColumn } from 'typeorm';

export abstract class PrimaryData extends BasicData {
  @PrimaryGeneratedColumn({ type: 'int8' })
  id: number;
}
