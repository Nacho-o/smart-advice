import { Routes } from '@angular/router';
import { DynamicFormComponent } from './forms/dynamic-form/dynamic-form.component';

export const routes: Routes = [
  { 
    path: 'forms/:id', 
    component: DynamicFormComponent 
  },
  { 
    path: '', 
    redirectTo: 'forms/2', 
    pathMatch: 'full' 
  }
];