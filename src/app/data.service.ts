import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'https://retoolapi.dev/HYd96h/data';
  private dataSubject = new BehaviorSubject<Employee[]>([]);

  constructor(private http: HttpClient) {}

  fetchEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  setEmployees(data: Employee[]): void {
    this.dataSubject.next(data);
  }

  getEmployees(): Observable<Employee[]> {
    return this.dataSubject.asObservable();
  }

  addEmployee(employee: Employee): void {
    const currentData = this.dataSubject.value;
    this.dataSubject.next([...currentData, employee]);
  }

  deleteEmployee(id: number): void {
    const updatedData = this.dataSubject.value.filter(emp => emp.id !== id);
    this.dataSubject.next(updatedData);
  }
}
