import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Section } from './section.entity';

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  response_type: string;

  @Column('jsonb', { nullable: true })
  options: string[];

  @Column({ default: false })
  is_required: boolean;

  @Column()
  order_number: number;

  @ManyToOne(() => Section, (section) => section.questions)
  @JoinColumn({ name: 'section_id' })
  section: Section;
}