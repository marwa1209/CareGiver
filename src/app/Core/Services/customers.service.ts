import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  constructor(private _HttpClient: HttpClient, private _Router: Router) {}
  getCustomerById(id: string | null): Observable<any> {
    return this._HttpClient.get(`http://localhost:5248/api/Customer/${id}`);
  }
  updateCustomerById(id: string | null, data: any): Observable<any> {
    return this._HttpClient.put(
      `http://localhost:5248/api/Customer/${id}`,
      data
    );
  }
  deleteCustomerById(id: string): Observable<any> {
    return this._HttpClient.delete(`http://localhost:5248/api/Customer/${id}`);
  }
}
