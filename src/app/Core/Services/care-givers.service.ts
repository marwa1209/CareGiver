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
    return this._HttpClient.get(
      `http://localhost:5248/api/Caregiver/AllCurrentCaregivers`
    );
  }
  getCareGiverById(id: string | null): Observable<any> {
    return this._HttpClient.get(`http://localhost:5248/api/Caregiver/${id}`);
  }
  getCareGiverByRole(role: string | null): Observable<any> {
    return this._HttpClient.get(
      `http://localhost:5248/api/Admin/Caregiver/${role}`
    );
  }
  editCareGiver(id: string | null, caregiverData:any|null): Observable<any> {
    return this._HttpClient.put(
      `http://localhost:5248/api/Caregiver/${id}`,
      caregiverData
    );
  }
}
