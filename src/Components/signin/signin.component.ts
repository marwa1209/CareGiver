import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { state } from '@angular/animations';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FormsModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
  LoginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  message: string = '';
  isLoading: boolean = false;
  constructor(private _AuthService: AuthService, private _Router: Router) {}
  handleRegister(): void {
    this.isLoading = true;
    const userData = this.LoginForm.value;
    this._AuthService.setLogin(userData).subscribe({
      next: (response) => {
        this.isLoading = false;
        localStorage.setItem('etoken', response.token);
        const state = this._AuthService.decodeUserData().Status;
        const role = this._AuthService.decodeUserData().role;
        console.log(response.user)
        if (response.user.isActived == false || response.user.isActived == null) {
          if (role == 'PatientUser') {
            this._Router.navigate(['/home']);
          } else if (
            response.user.type == 'CaregiverUser' &&
            state == 'active'
          ) {
            this._Router.navigate(['/orders']);
          } else if (
            response.user.type == 'CaregiverUser' &&
            state == 'form incomplete'
          ) {
            this._Router.navigate(['/caregiverForm']);
          } else if (
            response.user.type == 'CaregiverUser' &&
            state == 'pending'
          ) {
            this._Router.navigate(['/pending']);
          } else if (
            response.user.type == 'CaregiverUser' &&
            state == 'blocked'
          ) {
            this._Router.navigate(['/blocked']);
          } else if (role == 'AdminUser') {
            this._Router.navigate(['/admin-dashboard']);
          }
        } else {
          this.message = 'You Deleted Your Account';
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.message = error.error.message;
        console.log(error);
      },
    });
  }

  togglePasswordVisibility(inputField: HTMLInputElement) {
    inputField.type = inputField.type === 'password' ? 'text' : 'password';
  }
}
