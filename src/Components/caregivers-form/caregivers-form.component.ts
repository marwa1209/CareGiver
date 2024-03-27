import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyHttpInterceptor } from 'src/app/Core/my-http.interceptor';

@Component({
  selector: 'app-caregivers-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './caregivers-form.component.html',
  styleUrls: ['./caregivers-form.component.scss'],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: MyHttpInterceptor, multi: true },
  ],
})
export class CaregiversFormComponent implements OnInit{
  message: string = '';
  isLoading: boolean = false;
  constructor(private _AuthService: AuthService, private _Router: Router) {}
  ngOnInit(): void {
   const x= this._AuthService.decodeUserData();
   console.log(x.role)
  }
  RegisterForm: FormGroup = new FormGroup({
    Country: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
    ]),
    City: new FormControl(1, [Validators.required]),
    CareerLevel: new FormControl(1, [Validators.required]),
    YearsOfExperience: new FormControl(null, [
      Validators.required,
      Validators.max(50),
      Validators.min(1),
    ]),
    JobTitle: new FormControl(1, [Validators.required]),
    JobLocationLookingFor: new FormControl(3, [Validators.required]),
    WhatCanCaregiverDo: new FormControl(
      null
    ),
    PricePerHour: new FormControl('', [
      Validators.required,
      Validators.min(50),
      Validators.max(500),
    ]),
    PricePerDay: new FormControl('', [
      Validators.required,
      Validators.min(100),
      Validators.max(1000),
    ]),
    Resume: new FormControl(null, [Validators.required]),
    UploadPhoto: new FormControl(null, [Validators.required]),
    CriminalRecords: new FormControl(null, [Validators.required]),
  });
  arrayOfStringsValidator(): any {
    return (control: FormControl): { [key: string]: any } | null => {
      const value: any[] = control.value;
      if (value && Array.isArray(value)) {
        for (const item of value) {
          if (typeof item !== 'string') {
            return { invalidArray: true };
          }
        }
        return null;
      }
      return { invalidArray: true };
    };
  }
  addInputData(value: string): void {
    const control = this.RegisterForm.get('WhatCanCaregiverDo');
    if (control) {
      const currentValue = control.value as string[];
      currentValue.push(value);
      control.setValue(currentValue);
    }
  }


  removeInputData(index: number): void {
    const control = this.RegisterForm.get('WhatCanCaregiverDo');
    if (control) {
      const currentValue = control.value as string[];
      currentValue.splice(index, 1);
      control.setValue(currentValue);
    }
  }
  handleRegister(): void {
    this.isLoading = true;
    const userData = this.RegisterForm.value;
    console.log(userData);
    if (this.RegisterForm.valid) {
      this._AuthService.setformNurse(userData).subscribe({
        next: (response) => {
          if (response.isSuccess == true) {
            this.isLoading = false;
            this._Router.navigate(['/home']);
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
