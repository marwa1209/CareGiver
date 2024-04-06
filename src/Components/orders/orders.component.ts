import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchreervationPipePipe } from 'src/app/Core/Pipes/searchreervation.pipe.pipe';
import { RouterLink } from '@angular/router';
import { Orderdetails } from 'src/app/Core/Interfaces/orderdetails';
import { ReservationService } from 'src/app/Core/Services/reservation.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, FormsModule, SearchreervationPipePipe, RouterLink],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent {
  base64Image: string = '';
  term: string = '';
  state: string = '';
  allorders: Orderdetails[] = [];
  constructor(private _ReservationService: ReservationService) {
    this.base64Image = 'data:image/jpeg;base64,';
  }
  ngOnInit(): void {
    this.getAllOrders();
  }
  accept(id: any) {
    this._ReservationService.updateStatues(id, 5).subscribe({
      next: (data) => {
        const updatedOrderIndex = this.allorders.findIndex(
          (order) => order.orderId === id
        );
        if (updatedOrderIndex !== -1) {
          this.allorders[updatedOrderIndex].status = 'Pending';
        }
        this.getAllOrders();
      },
      error: (err) => {
        console.log('Error updating status:', err);
      },
    });
  }
  getAllOrders() {
    this._ReservationService.getAllordersnurses().subscribe({
      next: (Response) => {
        this.allorders = Response;
        console.log(this.allorders);
        this.allorders.forEach((element) => {
          this.state = element.status;
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  decline(id: any) {
    this._ReservationService.updateStatues(id, 4).subscribe({
      next: (data) => {
        const updatedOrderIndex = this.allorders.findIndex(
          (order) => order.orderId === id
        );
        if (updatedOrderIndex !== -1) {
          this.allorders[updatedOrderIndex].status = 'CannotProceed';
        }
        this.getAllOrders();
      },
      error: (err) => {
        console.log('Error updating status:', err);
      },
    });
  }
}
