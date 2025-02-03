import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DynamicFormComponent } from './forms/dynamic-form/dynamic-form.component';

const routes: Routes = [
    { path: 'forms/:id', component: DynamicFormComponent },
    { path: '', redirectTo: 'forms/2', pathMatch: 'full' },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }