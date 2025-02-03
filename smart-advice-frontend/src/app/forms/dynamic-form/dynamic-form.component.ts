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

// dynamic-form.component.ts
ngOnInit() {
  console.log('[DynamicForm] Inicializando componente...');
  const formId = this.route.snapshot.paramMap.get('id');
  console.log('[DynamicForm] ID del formulario:', formId);

  this.formService.getForm(Number(formId)).subscribe({
    next: (data) => {
      console.log('[DynamicForm] Datos recibidos del backend:', data);
      this.formData = data;
      this.createForm();
    },
    error: (err) => {
      console.error('[DynamicForm] Error al cargar el formulario:', err);
    },
    complete: () => {
      console.log('[DynamicForm] Solicitud completada');
    }
  });
}

createForm() {
  console.log('[DynamicForm] Creando controles del formulario...');
  const group: any = {};

  this.formData.sections.forEach((section: any, index: number) => {
    console.log(`[DynamicForm] Procesando sección ${index + 1}: ${section.name}`);
    section.questions.forEach((question: any, qIndex: number) => {
      console.log(`[DynamicForm] Pregunta ${qIndex + 1}: ${question.text}`);
      group[`q_${question.id}`] = [null];
    });
  });

  this.formGroup = this.fb.group(group);
  console.log('[DynamicForm] FormGroup creado:', this.formGroup);
}

  onSubmit() {
    if (this.formGroup.valid) {
      console.log('Respuestas:', this.formGroup.value);
      // Aquí enviarías las respuestas al backend
    }
  }
}