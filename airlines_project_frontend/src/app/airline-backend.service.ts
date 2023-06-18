import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private baseUrl = 'http://localhost:8081/api/v1/airline_project'; // Reemplaza con la URL base de tu backend

  constructor(private http: HttpClient) { }

  getFlights() {
    return this.http.get(`${this.baseUrl}/flights`);
  }

  // Agrega más métodos según las operaciones que necesites realizar en el backend (crear comentario, obtener comentarios, etc.)
}