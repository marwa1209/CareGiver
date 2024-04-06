import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationService } from 'src/app/Core/Services/reservation.service';
import { AuthService } from 'src/app/Core/Services/auth.service';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {
  schedule:any[]=[];
  constructor(
    private _ReservationService: ReservationService,
    private _AuthService: AuthService
  ) {}
  ngOnInit(): void {
    this.getDates();
  }
  getDates() {
    const id = this._AuthService.decodeUserData().nameid;
    this._ReservationService.Getdate(id).subscribe({
      next: (data) => {
        this.schedule=data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
