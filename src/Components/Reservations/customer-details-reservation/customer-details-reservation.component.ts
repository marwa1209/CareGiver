import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReservationService } from 'src/app/Core/Services/reservation.service';
import { Patient } from 'src/app/Core/Interfaces/patient';
import { AuthService } from 'src/app/Core/Services/auth.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CareGiversService } from 'src/app/Core/Services/care-givers.service';
import { ICaregiver } from 'src/app/Core/Interfaces/caregiver';
import { CustomersService } from 'src/app/Core/Services/customers.service';

@Component({
  selector: 'app-customer-details-reservation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './customer-details-reservation.component.html',
  styleUrls: ['./customer-details-reservation.component.scss'],
})
export class CustomerDetailsReservationComponent implements OnInit {
  disableddates: any[] = [];
  isLoading: boolean = false;
  resrveinfo: any;
  id: string | null = '';
  todaydate: string = '';
  maxDate: string = '';
  maxDateEnd: string = '';
  startDate: string = '';
  endDate: string = '';
  Patientdata: Patient | null = null;
  caregiver: ICaregiver | null = null;
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ReservationService: ReservationService,
    private _AuthService: AuthService,
    private _CareGiversService: CareGiversService,
    private _Router: Router,
    private _CustomersService: CustomersService
  ) {
    //date
    const today = new Date();
    this.todaydate = today.toISOString().split('T')[0];
    const maxDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 7
    );
    const maxDateEnd = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 14
    );

    this.maxDate = maxDate.toISOString().split('T')[0];
    this.maxDateEnd = maxDateEnd.toISOString().split('T')[0];
    this.startDate = this.todaydate;
    this.endDate = this.todaydate;
  }
  calculateDays(): number {
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);
    const timeDifference = end.getTime() - start.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24)) + 1;
    return daysDifference;
  }
  persoaldetailsForm: FormGroup = new FormGroup({
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
    gender: new FormControl('', [Validators.required]),
    age: new FormControl('', [
      Validators.required,
      Validators.min(10),
      Validators.max(100),
    ]),
    emailAddress: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(01|1)[0125][0-9]{8}$/),
    ]),
    location: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(200),
    ]),
    reservationNotes: new FormControl('', [
      Validators.minLength(10),
      Validators.maxLength(200),
    ]),
    reservationType: new FormControl(1, [Validators.required]),
  });
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('nurseid');
    });
    const customerid = this._AuthService.decodeUserData().nameid;
    console.log(customerid);
    this._CustomersService.getCustomerById(customerid).subscribe({
      next: (data) => {
        this.Patientdata = data.result;
        console.log(this.Patientdata);
        this.persoaldetailsForm
          .get('firstName')
          ?.setValue(this.Patientdata?.firstName);
        this.persoaldetailsForm
          .get('lastName')
          ?.setValue(this.Patientdata?.lastName);
        this.persoaldetailsForm
          .get('emailAddress')
          ?.setValue(this.Patientdata?.email);
        this.persoaldetailsForm
          .get('phoneNumber')
          ?.setValue(this.Patientdata?.phoneNumber);
        if (this.Patientdata?.gender == 'Female') {
          this.persoaldetailsForm.get('gender')?.setValue(2);
        } else if (this.Patientdata?.gender == 'Male') {
          this.persoaldetailsForm.get('gender')?.setValue(1);
        }
        this.persoaldetailsForm
          .get('location')
          ?.setValue(this.Patientdata?.location);
        this.persoaldetailsForm.get('age')?.setValue(this.Patientdata?.age);
      },
      error: (err) => {
        console.log(err);
      },
    });

    this._CareGiversService.getCareGiverById(this.id).subscribe({
      next: (data) => {
        this.caregiver = data.result;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  //submit data and reservation date
  sendreserve() {
    this.isLoading = true;
    this.resrveinfo = {
      CaregiverId: this.id,
      StartDate: this.startDate,
      EndDate: this.endDate,
      dependentId: 0,
    };
    this._ReservationService
      .Reserve(this.startDate, this.endDate, this.id)
      .subscribe({
        next: (response) => {
          const orderid = response;
          this.isLoading = false;
          this._Router.navigate(['/Orderconfirmeddetails', orderid]);
        },
        error: (err) => {
          this.isLoading = false;
          console.log(err);
        },
      });
  }
  handleSubmit() {
    this.isLoading = true;
    console.log(this.persoaldetailsForm.value);
    this._ReservationService
      .editpersonaldetails(this.persoaldetailsForm.value)
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          console.log(response);
          this.sendreserve();
          const nurseid = this.id;
        },
        error: (err) => {
          this.isLoading = false;
          console.log(err);
        },
      });
  }
}
