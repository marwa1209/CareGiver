import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  constructor(private _HttpClient: HttpClient, private _Router: Router) {}
  editpersonaldetails(peronaldetails: any | null): Observable<any> {
    return this._HttpClient.put(
      `http://localhost:5248/api/PersonalDetails/UpdatePersonalDetails`,
      peronaldetails
    );
  }
  Reserve(startDate: any, endDate: any, CaregiverId: any): Observable<any> {
    return this._HttpClient.post(
      `http://localhost:5248/api/Reservations?CaregiverId=${CaregiverId}`,
      {
        startDate: startDate,
        endDate: endDate,
      }
    );
  }
  getPatietReservationById(id: any): Observable<any> {
    return this._HttpClient.get(`http://localhost:5248/api/Reservations/${id}`);
  }
  getAllPatients(): Observable<any> {
    return this._HttpClient.get(
      `http://localhost:5248/api/Reservations/PatientReservations`
    );
  }
  getAllordersnurses(): Observable<any> {
    return this._HttpClient.get(
      `http://localhost:5248/api/Reservations/CaregiverReservations`
    );
  }
  updateStatues(orderid: any, state: number): Observable<any> {
    return this._HttpClient.put(
      `http://localhost:5248/api/Reservations/${orderid}`,
      { status: state }
    );
  }
  AllReservations(): Observable<any> {
    return this._HttpClient.get(`http://localhost:5248/api/Reservations/admin`);
  }
  GetOrderyId(id: any): Observable<any> {
    return this._HttpClient.get(`http://localhost:5248/api/Reservations/${id}`);
  }
  GetAlltransactions(): Observable<any> {
    return this._HttpClient.get(
      `http://localhost:5248/api/Reservations/transactions`
    );
  }
  Getdate(id:any): Observable<any> {
    return this._HttpClient.get(
      `http://localhost:5248/api/Reservations/ReservationsDates?id=${id}`
    );
  }
}
