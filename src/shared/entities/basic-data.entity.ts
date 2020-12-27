import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BasicData {

  @Column({ nullable: true, default: true })
  active: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at?: Date;

  @Column({ nullable: true })
  created_by?: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at?: Date;

  @Column({ nullable: true })
  updated_by?: string;
}
