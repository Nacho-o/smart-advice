import { Controller, Get, Param } from '@nestjs/common';
import { FormsService } from './forms.service';

@Controller('api/forms')
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Get(':id')
  async getForm(@Param('id') id: number) {
    return this.formsService.getFormWithSections(id);
  }
}