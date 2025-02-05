// src/answers/answers.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from '../entities/answer.entity';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
  ) {}

  async createAnswers(
    responses: Array<{ questionId: number; value: string }>,
    sessionId: string,
  ) {
    const answers = responses.map(({ questionId, value }) => {
      return this.answerRepository.create({
        questionId, // Usa el nombre camelCase (TypeORM aplicará snake_case automáticamente)
        value,
        sessionId,
      });
    });

    return this.answerRepository.save(answers);
  }
}