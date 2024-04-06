import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private _HttpClient: HttpClient, private _Router: Router) {}
  checkout(orderid: any): Observable<any> {
    return this._HttpClient.post(
      `http://localhost:5248/api/Checkout/CreateCheckout?id=${orderid}`,
      orderid
    );
  }
  confirm(sessionid: string | null): Observable<any> {
    return this._HttpClient.post(
      'http://localhost:5248/api/Reservations/ConfirmReservations',
      {
        sessionId: sessionid,
      }
    );
  }
}
