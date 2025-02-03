import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Form } from './entities/form.entity';
import { Section } from './entities/section.entity';
import { Question } from './entities/question.entity';
import { FormsService } from './forms.service';
import { FormsController } from './forms.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Form, Section, Question]), // <-- ¡Esta línea es crítica!
  ],
  controllers: [FormsController],
  providers: [FormsService],
})
export class FormsModule {}