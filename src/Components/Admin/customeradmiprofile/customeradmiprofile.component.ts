import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CustomersService } from 'src/app/Core/Services/customers.service';
import { Patient } from 'src/app/Core/Interfaces/patient';

@Component({
  selector: 'app-customeradmiprofile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customeradmiprofile.component.html',
  styleUrls: ['./customeradmiprofile.component.scss'],
})
export class CustomeradmiprofileComponent implements OnInit {
  id: string | null = '';
  customer:Patient|undefined;
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _CustomersService: CustomersService
  ) {}
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
      },
    });
    this.getcustomer()
  }
  getcustomer() {
    this._CustomersService.getCustomerById(this.id).subscribe({
      next: (data) => {
        this.customer = data.result;
        console.log(data.result);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
