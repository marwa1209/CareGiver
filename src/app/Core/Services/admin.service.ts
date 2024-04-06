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
      `http://localhost:5248/api/Admin/AdminDeleteCaregiver/${id}`
    );
  }
  deleteCustomerById(id: any): Observable<any> {
    return this._HttpClient.delete(`http://localhost:5248/api/Customer/${id}`);
  }
  getAllCustomers(): Observable<any> {
    return this._HttpClient.get(
      `http://localhost:5248/api/Customer/AllCurrentCustomer`
    );
  }
  getAllRequests(): Observable<any> {
    return this._HttpClient.get(
      `http://localhost:5248/api/Admin/RequestedCaregivers`
    );
  }
  acceptRequest(id: any): Observable<any> {
    return this._HttpClient.put(
      `http://localhost:5248/api/Admin/AcceptRequest/${id}`,
      id
    );
  }
  deleteRequest(id: any): Observable<any> {
    return this._HttpClient.delete(
      `http://localhost:5248/api/Admin/DeclineRequest/${id}`,
      id
    );
  }
  GetAlltransactions(): Observable<any> {
    return this._HttpClient.get(
      `http://localhost:5248/api/Reservations/transactions`
    );
  }
  getAllcaregiverssystem(): Observable<any> {
    return this._HttpClient.get(
      `http://localhost:5248/api/Admin/AllCaregivers`
    );
  }
  getAllReservations(): Observable<any> {
    return this._HttpClient.get(`http://localhost:5248/api/Reservations/admin`);
  }
}
