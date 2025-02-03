import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

// Angular Material Modules
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

// Componentes
import { AppComponent } from './app.component';
import { DynamicFormComponent } from './forms/dynamic-form/dynamic-form.component';


@NgModule({
  declarations: [
    AppComponent,
    DynamicFormComponent  // <-- Componente añadido aquí
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // <-- Módulo de animaciones
    AppRoutingModule,
    
    // Angular Material Modules
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatButtonModule
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()) // <-- Agrega esto
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }