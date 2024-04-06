import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Orderdetails } from 'src/app/Core/Interfaces/orderdetails';
import { ReservationService } from 'src/app/Core/Services/reservation.service';
import { RouterLink } from '@angular/router';
import { SearchreervationPipePipe } from 'src/app/Core/Pipes/searchreervation.pipe.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-all-reservation',
  standalone: true,
  imports: [CommonModule, FormsModule, SearchreervationPipePipe, RouterLink],
  templateUrl: './all-reservation.component.html',
  styleUrls: ['./all-reservation.component.scss'],
})
export class AllReservationComponent implements OnInit {
  base64Image: string = '';
  term: string = '';
  allorders: Orderdetails[] = [];
  constructor(private _ReservationService: ReservationService) {
    this.base64Image = 'data:image/jpeg;base64,';
  }
  ngOnInit(): void {
    this._ReservationService.AllReservations().subscribe({
      next: (Response) => {
        this.allorders = Response;
        console.log(this.allorders);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
