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
        this._AuthService.decodeUserData();
        if (response.user.type == 'PatientUser') {
          this._Router.navigate(['/home']);
        }
        else if (response.user.type == 'CaregiverUser') {
          this._Router.navigate(['/caregiverForm']);
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.message = error.error.message;
      },
    });
  }

  togglePasswordVisibility(inputField: HTMLInputElement) {
    inputField.type = inputField.type === 'password' ? 'text' : 'password';
  }
}
