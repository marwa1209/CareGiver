import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from 'src/app/Core/Services/admin.service';
import { ICaregiver } from 'src/app/Core/Interfaces/caregiver';
import { SearchPipe } from 'src/app/Core/Pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-manage-customers',
  standalone: true,
  imports: [CommonModule, SearchPipe, FormsModule,RouterLink],
  templateUrl: './manage-customers.component.html',
  styleUrls: ['./manage-customers.component.scss'],
})
export class ManageCustomersComponent implements OnInit {
  term: string = '';
  id: string = '';
  constructor(private _AdminService: AdminService) {}
  customers: any;
  ngOnInit(): void {
    this.getAllCustomers();
  }
  delete(id: string) {
    console.log(id);
    this._AdminService.deleteCustomerById(id).subscribe({
      next: (data) => {
        console.log(data);
        this.getAllCustomers();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getAllCustomers() {
    this._AdminService.getAllCustomers().subscribe({
      next: (data) => {
        this.customers = data.result;
        console.log(this.customers);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
