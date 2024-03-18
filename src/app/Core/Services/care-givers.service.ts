import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CareGiversService {
  constructor(private _HttpClient: HttpClient, private _Router: Router) {}
  getCareGivers(): Observable<any> {
    return this._HttpClient.get(`http://localhost:5248/api/Caregiver`);
  }
}
