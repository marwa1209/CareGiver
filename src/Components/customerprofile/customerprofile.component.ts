import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Patient } from 'src/app/Core/Interfaces/patient';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { CustomersService } from 'src/app/Core/Services/customers.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {
  AbstractControl,
  FormControl,
  FormControlOptions,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-customerprofile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './customerprofile.component.html',
  styleUrls: ['./customerprofile.component.scss'],
})
export class CustomerprofileComponent implements OnInit {
  id: string = '';
  update: string = '';
  message: string = '';
  showConfirmationDialog: boolean = false;
  showupdatedialog: boolean = false;
  countries: string[] = [
    'Egypt',
    'Canada',
    'UK',
    'Australia',
    'Germany',
    'France',
  ];
  Nationality: string = '';
  PatientData: Patient | undefined;
  selectNationality(Nationality: string) {
    this.editForm.get('nationality')?.setValue(Nationality);
  }
  editForm: FormGroup = new FormGroup({
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
    birthdate: new FormControl('2022-02-09', [
      Validators.required,
      this.birthdateRangeValidator(10, 100),
    ]),
    nationality: new FormControl('', [
      Validators.minLength(2),
      Validators.maxLength(20),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    location: new FormControl('', [
      Validators.minLength(7),
      Validators.maxLength(90),
    ]),

    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(01|1)[0125][0-9]{8}$/),
    ]),
  });
  Patientdata: Patient | undefined;
  constructor(
    private _AuthService: AuthService,
    private _CustomersService: CustomersService,
  ) {}
  updatepassForm: FormGroup = new FormGroup(
    {
      oldPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/),
      ]),
      confirmPassword: new FormControl(''),
    },
    { validators: [this.confirmPassword] } as FormControlOptions
  );
  confirmPassword(group: FormGroup): void {
    let password = group.get('newPassword');
    let confirmPassword = group.get('confirmPassword');

    if (!confirmPassword?.value) {
      confirmPassword?.setErrors({ required: true });
    } else if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ mismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
  }
  ngOnInit() {
    this.id = this._AuthService.decodeUserData().nameid;
    this._CustomersService.getCustomerById(this.id).subscribe({
      next: (data) => {
        this.Patientdata = data.result;
        this.editForm.get('firstName')?.setValue(this.Patientdata?.firstName);
        this.editForm.get('lastName')?.setValue(this.Patientdata?.lastName);
        this.editForm.get('email')?.setValue(this.Patientdata?.email);
        this.editForm
          .get('phoneNumber')
          ?.setValue(this.Patientdata?.phoneNumber);
        this.editForm.get('gender')?.setValue(this.Patientdata?.gender);
        this.editForm
          .get('nationality')
          ?.setValue(this.Patientdata?.nationality);
        this.editForm.get('location')?.setValue(this.Patientdata?.location);
        this.editForm.get('birthdate')?.setValue(this.Patientdata?.birthdate);
      },
      error: (err) => {
        console.log(err);
      },
    });
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
  handleUpdate(): void {
    if (this.editForm.valid) {
      this._CustomersService
        .updateCustomerById(this.id, this.editForm.value)
        .subscribe({
          next: (data) => {
            console.log(data);
            this.update = 'Updated Successfully';
          },
          error: (err) => {
            console.log(err);
            this.update = 'Something Went Wrong';
          },
        });
    } else {
      this.editForm.markAllAsTouched;
    }
  }
  delete() {
    this._CustomersService.deleteCustomerById(this.id).subscribe({
      next: (data) => {
        console.log(data);
        this.showConfirmationDialog = false;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  confirmDelete(): void {
    this.showConfirmationDialog = true;
  }

  cancelDelete(): void {
    this.showConfirmationDialog = false;
  }
  togglePasswordVisibility(inputField: HTMLInputElement) {
    inputField.type = inputField.type === 'password' ? 'text' : 'password';
  }
  showupdate() {
    this.showupdatedialog = true;
  }
  cancel() {
    this.showupdatedialog = false;
  }
  Update() {
    this._AuthService.changePass(this.updatepassForm.value).subscribe({
      next: (response) => {
        if (response.result !== 'The old password is incorrect') {
          this.message = response.result;
          this.showupdatedialog = false;
          console.log(response);
        } else if (response.result == 'The old password is incorrect') {
          this.showupdatedialog = true;
          this.message = response.result;
          console.log(response);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
