import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getForm(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/forms/${id}`);
  }

  // Nuevo método para guardar respuestas
  saveAnswers(responses: any, sessionId: string): Observable<any> {
    const formattedResponses = Object.entries(responses).map(([key, value]) => ({
      questionId: parseInt(key.replace('q_', ''), 10),
      value,
    }));
    
    return this.http.post(`${this.apiUrl}/answers`, {
      responses: formattedResponses,
      sessionId,
    });
  }
}