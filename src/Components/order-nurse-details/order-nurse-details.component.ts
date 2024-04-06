import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Orderdetails } from 'src/app/Core/Interfaces/orderdetails';
import { ReservationService } from 'src/app/Core/Services/reservation.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchreervationPipePipe } from 'src/app/Core/Pipes/searchreervation.pipe.pipe';

@Component({
  selector: 'app-order-nurse-details',
  standalone: true,
  imports: [CommonModule, FormsModule, SearchreervationPipePipe, RouterLink],
  templateUrl: './order-nurse-details.component.html',
  styleUrls: ['./order-nurse-details.component.scss'],
})
export class OrderNurseDetailsComponent implements OnInit {
  base64Image: string = '';
  term: string = '';
  id: any;
  order: Orderdetails | undefined;
  constructor(
    private _ReservationService: ReservationService,
    private _ActivatedRoute: ActivatedRoute
  ) {
    this.base64Image = 'data:image/jpeg;base64,';
  }
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('orderid');
      },
    });
    this.getorde();
  }
  getorde() {
    this._ReservationService.GetOrderyId(this.id).subscribe({
      next: (Response) => {
        this.order = Response;
        console.log(this.order);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
