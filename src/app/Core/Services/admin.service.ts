import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private _HttpClient: HttpClient) {}
  getAllCareNurses(): Observable<any> {
    return this._HttpClient.get(
      `http://localhost:5248/api/Admin/Caregiver/nurse`
    );
  }
  getAllCaregivers(): Observable<any> {
    return this._HttpClient.get(
      `http://localhost:5248/api/Admin/Caregiver/caregiver`
    );
  }
  getAllbabysitters(): Observable<any> {
    return this._HttpClient.get(
      `http://localhost:5248/api/Admin/Caregiver/Babysitter`
    );
  }
  deleteNurseById(id: string): Observable<any> {
    return this._HttpClient.delete(
      `http://localhost:5248/api/Admin/DeleteCaregiver${id}`
    );
  }
  getAllCustomers(): Observable<any> {
    return this._HttpClient.get(
      `http://localhost:5248/api/Customer/AllCurrentCustomer`
    );
  }
}
