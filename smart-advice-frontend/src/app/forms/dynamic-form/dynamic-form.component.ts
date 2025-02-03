import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  formData: any;
  formGroup!: FormGroup;

  constructor(
    private formService: FormService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    const formId = this.route.snapshot.paramMap.get('id');
    this.formService.getForm(Number(formId)).subscribe((data) => {
      this.formData = data;
      this.createForm();
    });
  }

  createForm() {
    const group: any = {};

    this.formData.sections.forEach((section: any) => {
      section.questions.forEach((question: any) => {
        group[`q_${question.id}`] = [null]; // Inicializar controles
      });
    });

    this.formGroup = this.fb.group(group);
  }

  onSubmit() {
    if (this.formGroup.valid) {
      console.log('Respuestas:', this.formGroup.value);
      // Aquí enviarías las respuestas al backend
    }
  }
}