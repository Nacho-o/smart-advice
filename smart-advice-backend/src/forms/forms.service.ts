import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Form } from './entities/form.entity';
import { Section } from './entities/section.entity';
import { Question } from './entities/question.entity';

@Injectable()
export class FormsService {
  constructor(
    @InjectRepository(Form)
    private formRepository: Repository<Form>,
    @InjectRepository(Section)
    private sectionRepository: Repository<Section>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}

  async getFormWithSections(id: number) {
    const form = await this.formRepository.findOne({ 
      where: { id },
      relations: ['sections'], // Carga las secciones automáticamente
    });

    if (!form) return null;

    const sectionsWithQuestions = await Promise.all(
      form.sections.map(async (section) => {
        const questions = await this.questionRepository.find({
          where: { section: { id: section.id } },
          order: { order_number: 'ASC' },
        });
        return { ...section, questions };
      }),
    );

    return { ...form, sections: sectionsWithQuestions };
  }
}