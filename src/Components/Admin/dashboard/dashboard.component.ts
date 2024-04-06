import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from 'src/app/Core/Services/admin.service';
import { Patient } from 'src/app/Core/Interfaces/patient';
import { ICaregiver } from 'src/app/Core/Interfaces/caregiver';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  allcustomer: Patient[] = [];
  allcaregivers: ICaregiver[] = [];
  allrequests: any[] = [];
  AllReservation: any[] = [];
  AllTransactions: any[] = [];
  base64Image: string = '';
  constructor(private _AdminService: AdminService) {}
  ngOnInit(): void {
    this.getAllcustomers();
    this.getAllcaregivers();
    this.getAllRequests();
    this.getAllReservations();
    this.getAllTransactions();
    this.base64Image = 'data:image/jpeg;base64,';
  }
  getAllcustomers() {
    this._AdminService.getAllCustomers().subscribe({
      next: (data) => {
        this.allcustomer = data.result;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getAllcaregivers() {
    this._AdminService.getAllcaregiverssystem().subscribe({
      next: (data) => {
        this.allcaregivers = data;
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getAllRequests() {
    this._AdminService.getAllRequests().subscribe({
      next: (data) => {
        this.allrequests = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getAllReservations() {
    this._AdminService.getAllReservations().subscribe({
      next: (data) => {
        this.AllReservation = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getAllTransactions() {
    this._AdminService.GetAlltransactions().subscribe({
      next: (data) => {
        this.AllTransactions = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
