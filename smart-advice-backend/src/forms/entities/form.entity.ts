import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Section } from './section.entity';

@Entity('forms')
export class Form {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Section, (section) => section.form)
  sections: Section[];
}