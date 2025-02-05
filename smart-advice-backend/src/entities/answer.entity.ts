// src/entities/answer.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('answers')
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'question_id' }) // Nombre real en la base de datos
  questionId: number;

  @Column()
  value: string;

  @Column({ name: 'session_id' })
  sessionId: string;

  @Column({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}