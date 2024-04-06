import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
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
export class CaregiversFormComponent implements OnInit {
  caregiverForm!: FormGroup;
  message: string = '';
  isLoading: boolean = false;
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.caregiverForm = this.fb.group({
      resume: [null, Validators.required],
      criminalRecords: [null, Validators.required],
      uploadPhoto: [null, Validators.required],
    });
    const x = this._AuthService.decodeUserData();
    console.log(x.role);
  }
  RegisterForm: FormGroup = new FormGroup({
    country: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
    ]),
    city: new FormControl(1, [Validators.required]),
    careerLevel: new FormControl(1, [Validators.required]),
    yearsOfExperience: new FormControl(null, [
      Validators.required,
      Validators.max(50),
      Validators.min(1),
    ]),
    jobTitle: new FormControl(1, [Validators.required]),
    jobLocationLookingFor: new FormControl(3, [Validators.required]),
    pricePerDay: new FormControl('', [
      Validators.required,
      Validators.min(100),
      Validators.max(1000),
    ]),
  });
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


  togglePasswordVisibility(inputField: HTMLInputElement) {
    inputField.type = inputField.type === 'password' ? 'text' : 'password';
  }
  onSubmit() {
    if (this.caregiverForm.valid) {
      const formData = new FormData();
      const resumeFile = (document.getElementById('resume') as HTMLInputElement)
        ?.files?.[0];
      const criminalRecordsFile = (
        document.getElementById('criminalRecords') as HTMLInputElement
      )?.files?.[0];
      const uploadPhotoFile = (
        document.getElementById('uploadPhoto') as HTMLInputElement
      )?.files?.[0];
      if (resumeFile) {
        formData.append('resume', resumeFile, resumeFile.name);
      }
      if (criminalRecordsFile) {
        formData.append(
          'criminalRecords',
          criminalRecordsFile,
          criminalRecordsFile.name
        );
      }
      if (uploadPhotoFile) {
        formData.append('uploadPhoto', uploadPhotoFile, uploadPhotoFile.name);
      }
      this._AuthService.uploadFiles(formData).subscribe({
        next: (Response) => {
          console.log(Response);
          localStorage.setItem('etoken', Response.message);
          console.log('FormData:', formData);
            this.isLoading = true;
            const userData = this.RegisterForm.value;
            console.log(userData);
            if (this.RegisterForm.valid) {
              this._AuthService.setformNurse(userData).subscribe({
                next: (response) => {
                  if (response.isSuccess == true) {
                    this.isLoading = false;
                    localStorage.setItem('etoken', response.message);
                    console.log(response.message);
                    console.log(response);
                    this._Router.navigate(['/pending']);
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
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }
}
