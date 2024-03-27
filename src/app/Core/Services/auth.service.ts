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
  logOut(): void {
    localStorage.removeItem('etoken');
  }

  forgetPassword(useremail: object): Observable<any> {
    return this._HttpClient.post(
      `http://localhost:5248/api/Auth/ForgotPassword`,
      useremail
    );
  }
  updatePass(email:string ,token:string ,password:string): Observable<any> {
    return this._HttpClient.put(
      `http://localhost:5248/api/Auth/UpdatePassword?email=${email}&token=${token}`,
      {token:token , password:password , email:email}

      
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

  //form nurse
  setformNurse(userData: object): Observable<any> {
    return this._HttpClient.post(
      `http://localhost:5248/api/Auth/CaregiverForm`,
      userData
    );
  }
}
