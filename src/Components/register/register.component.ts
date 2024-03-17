import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import {
  FormControl,
  FormControlOptions,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/Core/Services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  countries: string[] = [
    'Egypt',
    'Canada',
    'UK',
    'Australia',
    'Germany',
    'France',
  ];
  selectedCountry: string = '';
  selectCountry(country: string) {
    this.selectedCountry = country;
  }

  message: string = '';
  isLoading: boolean = false;
  constructor(private _AuthService: AuthService, private _Router: Router) {}
  RegisterForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(40),
      ]),
      gender: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/),
      ]),
      rePassword: new FormControl(''),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
      terms: new FormControl('', [Validators.required]),
    },
    { validators: [this.confirmPassword] } as FormControlOptions
  );
  confirmPassword(group: FormGroup): void {
    let password = group.get('password');
    let rePassword = group.get('rePassword');
    if (password?.value == '') {
      rePassword?.setErrors({ required: true });
    } else if (
      password?.value !== rePassword?.value &&
      rePassword?.value !== ''
    ) {
      rePassword?.setErrors({ missmatch: true });
    }
  }
  handleRegister(): void {
    this.isLoading = true;
    const userData = this.RegisterForm.value;
    if (this.RegisterForm.valid) {
      this._AuthService.setRegister(userData).subscribe({
        next: (response) => {
          if (response.message == 'success') {
            this.isLoading = false;
            this._Router.navigate(['/signin']);
          }
        },
        error: (error) => {
          this.message = error.error.message;
          console.log(error.error);
          this.isLoading = false;
        },
      });
    } else {
      this.RegisterForm.markAllAsTouched;
    }
  }
  togglePasswordVisibility(inputField: HTMLInputElement) {
    inputField.type = inputField.type === 'password' ? 'text' : 'password';
  }
}
