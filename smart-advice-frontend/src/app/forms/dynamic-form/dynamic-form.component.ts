import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormService } from '../../services/form.service';
import { MatTabsModule, MatTabChangeEvent } from '@angular/material/tabs'; // <-- Agrega MatTabChangeEvent
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  formData: any;
  formGroup!: FormGroup;
  currentTabIndex = 0;  // <-- Mueve la propiedad aquí

  constructor(
    private formService: FormService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

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
      }
    });
  }

  createForm() {
    const group: any = {};
    this.formData.sections.forEach((section: any) => {
      section.questions.forEach((question: any) => {
        group[`q_${question.id}`] = [null];
      });
    });
    this.formGroup = this.fb.group(group);
  }

  onSubmit() {
    if (this.formGroup.valid) {
      const sessionId = crypto.randomUUID(); // Generar sessionId único
      this.formService.saveAnswers(this.formGroup.value, sessionId).subscribe({
        next: () => console.log('Respuestas guardadas exitosamente'),
        error: (err) => console.error('Error al guardar respuestas:', err),
      });
    }
  }

  // Métodos para navegación entre tabs
  goToNextTab(currentIndex: number) {
    if (currentIndex < this.formData.sections.length - 1) {
      this.currentTabIndex = currentIndex + 1;
    }
  }

  onTabChange(event: MatTabChangeEvent) {  // <-- Ahora reconoce el tipo
    this.currentTabIndex = event.index;
  }
}