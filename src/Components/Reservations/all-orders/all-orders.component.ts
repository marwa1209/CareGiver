import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationService } from 'src/app/Core/Services/reservation.service';
import { Orderdetails } from 'src/app/Core/Interfaces/orderdetails';
import { FormsModule } from '@angular/forms';
import { SearchreervationPipePipe } from 'src/app/Core/Pipes/searchreervation.pipe.pipe';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-all-orders',
  standalone: true,
  imports: [CommonModule, FormsModule, SearchreervationPipePipe,RouterLink],
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.scss'],
})
export class AllOrdersComponent implements OnInit {
  base64Image:string='';
  term: string = '';
  allorders: Orderdetails[] = [];
  constructor(private _ReservationService: ReservationService) {
    this.base64Image = 'data:image/jpeg;base64,';
  }
  ngOnInit(): void {
    this._ReservationService.getAllPatients().subscribe({
      next: (Response) => {
        this.allorders = Response;
        console.log(this.allorders.length);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
