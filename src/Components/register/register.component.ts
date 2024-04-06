import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import {
  AbstractControl,
  FormControl,
  FormControlOptions,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
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
  Nationality: string = '';
  selectNationality(Nationality: string) {
    this.RegisterForm.get('nationality')?.setValue(Nationality);
  }
  message: string = '';
  isLoading: boolean = false;
  constructor(private _AuthService: AuthService, private _Router: Router) {}
  RegisterForm: FormGroup = new FormGroup(
    {
      userName: new FormControl(),
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      gender: new FormControl(null, [Validators.required]),
      Birthdate: new FormControl('', [
        Validators.required,
        this.birthdateRangeValidator(10, 100),
      ]),
      nationality: new FormControl('', [
        Validators.minLength(2),
        Validators.maxLength(20),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/),
      ]),
      confirmPassword: new FormControl(''),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
      terms: new FormControl('', [Validators.required]),
    },
    { validators: [this.confirmPassword] } as FormControlOptions
  );
  confirmPassword(group: FormGroup): void {
    let password = group.get('password');
    let confirmPassword = group.get('confirmPassword');

    if (!confirmPassword?.value) {
      confirmPassword?.setErrors({ required: true });
    } else if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ mismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
  }
  handleRegister(): void {
    this.RegisterForm.controls['userName'].setValue(
      this.RegisterForm.controls['firstName'].value +
        this.RegisterForm.controls['email'].value
    );
    this.isLoading = true;
    const userData = this.RegisterForm.value;
    console.log(userData);
    if (this.RegisterForm.valid) {
      this._AuthService.setRegister(userData).subscribe({
        next: (response) => {
          if (response.isSuccess == true) {
            this.isLoading = false;
            this._Router.navigate(['/signin']);
          }
        },
        error: (error) => {
          console.log(userData);
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
  birthdateRangeValidator(minAge: number, maxAge: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const Birthdate = control.value;

      if (!Birthdate) {
        return { required: true };
      }

      const birthDate = new Date(Birthdate);
      const today = new Date();
      const diff = today.getTime() - birthDate.getTime();
      const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));

      if (age < minAge || age > maxAge) {
        return { ageRange: true };
      }

      return null;
    };
  }
}
