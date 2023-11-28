import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/api';
  private http = inject(HttpClient);

  getTodos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tasks`);
  }

  addTodo(newTodo: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/tasks`, newTodo);
  }

  completeTask(taskId: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/completeTask/${taskId}`, {});
  }

  deleteTask(taskId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/tasks/${taskId}`, {});
  }
}
