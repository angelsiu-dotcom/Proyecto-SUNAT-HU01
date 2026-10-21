import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecursoService {
  private apiUrl = 'http://localhost:8080/api/recursos/guardar';

  constructor(private http: HttpClient) {}

  guardarRecurso(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}