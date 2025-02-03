import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private apiUrl = 'http://localhost:3000/forms/2';

  constructor(private http: HttpClient) {}

  getForm(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}