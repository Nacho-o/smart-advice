// src/answers/answers.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { AnswersService } from './answers.service';

@Controller('api/answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @Post()
  async saveAnswers(
    @Body() body: { responses: Array<{ questionId: number; value: string }>; sessionId: string },
  ) {
    return this.answersService.createAnswers(body.responses, body.sessionId);
  }
}