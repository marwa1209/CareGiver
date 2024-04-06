import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationService } from 'src/app/Core/Services/reservation.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Orderdetails } from 'src/app/Core/Interfaces/orderdetails';
import { FormsModule } from '@angular/forms';
import { PaymentService } from 'src/app/Core/Services/payment.service';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-orderconfirmeddetails',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './orderconfirmeddetails.component.html',
  styleUrls: ['./orderconfirmeddetails.component.scss'],
})
export class OrderconfirmeddetailsComponent implements OnInit {
  orderid: any;
  orderdetails: Orderdetails | undefined;
  adjustedDifferenceInDays: any;
  private ReservationService: Subscription | undefined;
  staues: string = '';
  constructor(
    private _ReservationService: ReservationService,
    private _ActivatedRoute: ActivatedRoute,
    private _PaymentService: PaymentService
  ) {
  }
  ngOnInit(): void {
    if (localStorage.getItem('sessionId') != null) {
      this.confirm();
    }
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.orderid = params.get('orderid');
        this.startPolling();
      },
    });
    setInterval(() => {
      this.startPolling();
    }, 5000);
  }
  pay() {
    this._PaymentService.checkout(this.orderid).subscribe({
      next: (response) => {
        console.log(response);
        localStorage.setItem('sessionId', response.sessionId.toString());
        window.open(response.sessionlink, '_self');
        this.startPolling();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  startPolling(): void {
    this._ReservationService.getPatietReservationById(this.orderid).subscribe({
      next: (response) => {
        console.log(response);
        this.staues = response.status;
        this.orderdetails = response;
        const startDate = this.orderdetails?.startDate
          ? new Date(this.orderdetails.startDate)
          : null;
        const endDate = this.orderdetails?.endDate
          ? new Date(this.orderdetails.endDate)
          : null;
        if (startDate && endDate) {
          const differenceInMilliseconds =
            endDate.getTime() - startDate.getTime();
          const differenceInDays =
            differenceInMilliseconds / (1000 * 60 * 60 * 24);
          this.adjustedDifferenceInDays = differenceInDays + 1;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  confirm() {
    const sessionid: string | null = localStorage.getItem('sessionId');
    this._PaymentService.confirm(sessionid).subscribe({
      next: (response) => {
        window.location.reload();
        console.log('Reservation confirmed:', response);
      },
      error: (err) => {
        console.log('Error confirming reservation:', err.error);
      },
    });
  }
}
