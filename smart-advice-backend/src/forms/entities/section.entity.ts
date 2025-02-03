import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Form } from './form.entity';
import { Question } from './question.entity';

@Entity('sections')
export class Section {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  order_number: number;

  @ManyToOne(() => Form, (form) => form.sections)
  @JoinColumn({ name: 'form_id' })
  form: Form;


  @OneToMany(() => Question, (question) => question.section)
  questions: Question[];
}