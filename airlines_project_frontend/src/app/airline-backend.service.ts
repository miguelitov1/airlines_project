import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private baseUrl = 'http://localhost:8081/api/v1/airline_project'; // Reemplaza con la URL base de tu backend
  private token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlck5hbWUiOiJKdWFuIiwidXNlcklkIjoianVhbnRvcG8xMjMiLCJ1c2VyTGFzdE5hbWUiOiJUb3BvIiwiaWF0IjoxNjg3MjAzMjI5LCJleHAiOjE2ODk3OTUyMjl9.y30tWpqwuYBrpt0RNBMn45kEVhRlXsE2PSUbgVXuPts";

  constructor(private http: HttpClient) { }

  getFlights() {
    return this.http.get(`${this.baseUrl}/flights`).pipe(
      catchError(() => throwError(() => new Error('Flight request error')))
    );
  }

  getCommentsByFlightId(flightId: number) {
    return this.http.get(`${this.baseUrl}/comments/${flightId}`).pipe(
      catchError(() => throwError(() => new Error('Comments request error')))
    );
  }

  createComment(comment: any) {
    const headers = new HttpHeaders().set('Authorization', this.token);
  
    return this.http.post(`${this.baseUrl}/comments`, comment, { headers }).pipe(
      catchError(() => throwError(() => new Error('Comments post error')))
    );
  }

  addTagsToComment(commentId: number, tags: string[]): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', this.token);

    return this.http.post<any>(`${this.baseUrl}/comments/${commentId}/tags`, tags, { headers }).pipe(
      catchError(() => throwError(() => new Error('Comments post error')))
    );
  }

}