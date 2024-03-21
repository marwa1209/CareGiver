import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _HttpClient: HttpClient, private _Router: Router) {}
  userdata: any;
  loogedIn: boolean = false;
  decodeUserData() {
    const encodeToken: any = localStorage.getItem('etoken');
    if (encodeToken !== null) {
      const decodeToken = jwtDecode(encodeToken);
      this.userdata = decodeToken;
      console.log(decodeToken);
      return this.userdata;
    }
  }

  setRegister(userData: object): Observable<any> {
    return this._HttpClient.post(
      `http://localhost:5248/api/Auth/PatientRegister`,
      userData
    );
  }
  setLogin(userData: object): Observable<any> {
    return this._HttpClient.post(
      `http://localhost:5248/api/Auth/login`,
      userData
    );
  }
  forgetPassword(useremail: object): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
      useremail
    );
  }
  verifyResetCode(resetCode: object): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
      resetCode
    );
  }
  logOut(): void {
    localStorage.removeItem('etoken');
  }
  updatePass(passwords: object): Observable<any> {
    return this._HttpClient.put(
      `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
      passwords
    );
  }
  handlenotFound(): boolean {
    if (localStorage.getItem('token') != null) {
      this.loogedIn == true;
      return true;
    } else {
      this.loogedIn == false;
      return false;
    }
  }
  //register nurse
  setRegisterNurse(userData: object): Observable<any> {
    return this._HttpClient.post(
      `http://localhost:5248/api/Auth/CaregiverRegister`,
      userData
    );
  }
}
