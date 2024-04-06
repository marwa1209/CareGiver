import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationService } from 'src/app/Core/Services/reservation.service';
import { CustomersService } from 'src/app/Core/Services/customers.service';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
  id: string = '';
  Alltransactions: any[] = [];
  constructor(
    private _ReservationService: ReservationService,
    private _CustomersService: CustomersService
  ) {}
  ngOnInit(): void {
    this.getAlltransactions();
  }
  getAlltransactions() {
    this._ReservationService.GetAlltransactions().subscribe({
      next: (data) => {
        this.Alltransactions = data;
        console.log(this.Alltransactions);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
