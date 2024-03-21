import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/Core/Services/auth.service';
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

@Component({
  selector: 'app-register-form-caregiver',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './register-form-caregiver.component.html',
  styleUrls: ['./register-form-caregiver.component.scss'],
})
export class RegisterFormCaregiverComponent {
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
    this.RegisterForm.get('Nationality')?.setValue(Nationality);
  }

  message: string = '';
  isLoading: boolean = false;
  constructor(private _AuthService: AuthService, private _Router: Router) {}
  RegisterForm: FormGroup = new FormGroup(
    {
      FirstName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      LastName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      Bio: new FormControl(''),
      Birthdate: new FormControl('', [
        Validators.required,
        this.birthdateRangeValidator(10, 100),
      ]),
      Gender: new FormControl('', [Validators.required]),
      Nationality: new FormControl('', [
        Validators.minLength(2),
        Validators.maxLength(20),
      ]),
      Email: new FormControl('', [Validators.required, Validators.email]),
      Password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/),
      ]),
      ConfirmPassword: new FormControl(''),
      terms: new FormControl('', [Validators.required]),
    },
    { validators: [this.confirmPassword] } as FormControlOptions
  );
  confirmPassword(group: FormGroup): void {
    let password = group.get('Password');
    let confirmPassword = group.get('ConfirmPassword');

    if (!confirmPassword?.value) {
      confirmPassword?.setErrors({ required: true });
    } else if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ mismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
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
  handleRegister(): void {
    this.isLoading = true;
    const userData = this.RegisterForm.value;
    if (this.RegisterForm.valid) {
      this._AuthService.setRegisterNurse(userData).subscribe({
        next: (response) => {
          if (response.message == 'success') {
            this.isLoading = false;
            this._Router.navigate(['/registernurse2']);
          }
        },
        error: (error) => {
          console.log(userData)
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
