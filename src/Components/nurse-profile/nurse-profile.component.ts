import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICaregiver } from 'src/app/Core/Interfaces/caregiver';
import { CareGiversService } from 'src/app/Core/Services/care-givers.service';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-nurse-profile',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './nurse-profile.component.html',
  styleUrls: ['./nurse-profile.component.scss'],
})
export class NurseProfileComponent implements OnInit {
  countries: string[] = [
    'Egypt',
    'Canada',
    'UK',
    'Australia',
    'Germany',
    'France',
  ];
  nationality: string = '';
  selectNationality(nationality: string) {
    this.EditCareGiverForm.get('nationality')?.setValue(nationality);
  }
  fname: string | undefined = '';
  lname: string | undefined = '';
  gender: string | undefined = '';
  joptitle: any;
  city: string | undefined = '';
  careerlevel: any;
  caregiver: ICaregiver | null = null;
  isHidden: boolean = false;
  isHiddenPersonalDat: boolean = false;
  isHiddenprofessionalData: boolean = false;
  constructor(
    private _CareGiversService: CareGiversService,
    private _AuthService: AuthService
  ) {}
  EditCareGiverForm: FormGroup = new FormGroup({
    bio: new FormControl(''),
    country: new FormControl('', [
      Validators.minLength(2),
      Validators.maxLength(20),
    ]),
    city: new FormControl(1),
    gender: new FormControl(2),
    birthdate: new FormControl(null, [this.birthdateRangeValidator(10, 100)]),
    nationality: new FormControl('', [
      Validators.minLength(2),
      Validators.maxLength(20),
    ]),
    email: new FormControl('', [Validators.email]),
    phoneNumber: new FormControl('', [Validators.pattern(/^1[0125][0-9]{8}$/)]),
    careerLevel: new FormControl(1),
    yearsOfExperience: new FormControl(null, [
      Validators.max(50),
      Validators.min(1),
    ]),
    jobTitle: new FormControl(1),
    pricePerHour: new FormControl('', [
      Validators.min(50),
      Validators.max(500),
    ]),
    pricePerDay: new FormControl('', [
      Validators.min(100),
      Validators.max(1000),
    ]),
  });

  ngOnInit() {
    const id = this._AuthService.decodeUserData().nameid;
    this._CareGiversService.getCareGiverById(id).subscribe({
      next: (data) => {
        this.caregiver = data.result;
        this.fname = this.caregiver?.firstName;
        this.lname = this.caregiver?.lastName;
        this.gender = this.caregiver?.gender;
        this.city = this.caregiver?.city;
        this.joptitle = this.caregiver?.jobTitle;
        this.careerlevel = this.caregiver?.careerLevel;
        // Set the initial value of the FormControl
        this.EditCareGiverForm.get('bio')?.setValue(this.caregiver?.bio);
        this.EditCareGiverForm.get('country')?.setValue(
          this.caregiver?.country
        );

        this.EditCareGiverForm.get('city')?.setValue(this.caregiver?.city);
        this.EditCareGiverForm.get('gender')?.setValue(this.caregiver?.gender);
        this.EditCareGiverForm.get('birthdate')?.setValue(
          this.caregiver?.birthdate
        );
        this.EditCareGiverForm.get('nationality')?.setValue(
          this.caregiver?.nationality
        );
        this.EditCareGiverForm.get('email')?.setValue(this.caregiver?.email);
        this.EditCareGiverForm.get('phoneNumber')?.setValue(
          this.caregiver?.phoneNumber
        );
        this.EditCareGiverForm.get('careerLevel')?.setValue(
          this.caregiver?.careerLevel
        );
        this.EditCareGiverForm.get('yearsOfExperience')?.setValue(
          this.caregiver?.yearsOfExperience
        );
        this.EditCareGiverForm.get('jobTitle')?.setValue(
          this.caregiver?.jobTitle
        );
        this.EditCareGiverForm.get('pricePerHour')?.setValue(
          this.caregiver?.pricePerHour
        );
        this.EditCareGiverForm.get('pricePerDay')?.setValue(
          this.caregiver?.pricePerDay
        );
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  submit(e: Event) {
    e.preventDefault();

    const id = this._AuthService.decodeUserData().nameid;
    const userData = this.EditCareGiverForm.value;
    this.caregiver = userData;
    this.isHidden = false;
    this.isHiddenPersonalDat = false;
    this.isHiddenprofessionalData = false;
    console.log(userData);
    //set enums
    if (this.caregiver?.city == 'Cairo') {
      this.caregiver.city = 1;
      this.city = 'cairo';
    } else if (this.caregiver?.city == 'Alexandria') {
      this.caregiver.city = 2;
      this.city = 'Alexandria';
    } else if (this.caregiver?.city == 'AboTesht') {
      this.caregiver.city = 3;
      this.city = 'AboTesht';
    }
    if (this.caregiver?.gender == 'Male') {
      this.caregiver.gender = 1;
      this.gender = 'Male';
    } else if (this.caregiver?.gender == 'Female') {
      this.caregiver.gender = 2;
      this.gender = 'Female';
    }
    if (this.caregiver?.jobTitle == 'Nurse') {
      this.caregiver.jobTitle = 1;
      this.joptitle = 'Nurse';
    } else if (this.caregiver?.jobTitle == 'Caregiver') {
      this.caregiver.jobTitle = 2;
      this.joptitle = 'Caregiver';
    } else if (this.caregiver?.jobTitle == 'Babysitter') {
      this.caregiver.jobTitle = 3;
      this.joptitle = 'Babysitter';
    }
    if (this.caregiver?.careerLevel == 'Student') {
      this.caregiver.careerLevel = 1;
      this.careerlevel = 'Student';
    } else if (this.caregiver?.careerLevel == 'FreshGraduate') {
      this.caregiver.careerLevel = 2;
      this.careerlevel = 'FreshGraduate';
    } else if (this.caregiver?.careerLevel == 'Experienced') {
      this.caregiver.careerLevel = 3;
      this.careerlevel = 'Experienced';
    }
    this._CareGiversService.editCareGiver(id, this.caregiver).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  cancel() {
    this.isHidden = false;
  }
  show() {
    this.isHidden = true;
  }
  //personaldata
  showpersonal() {
    this.isHiddenPersonalDat = true;
  }
  cancelpersonal() {
    this.isHiddenPersonalDat = false;
  }
  //professional
  showprof() {
    this.isHiddenprofessionalData = true;
  }
  cancelprof() {
    this.isHiddenprofessionalData = false;
  }
  prevenrdefault(e:Event){
e.preventDefault();
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
