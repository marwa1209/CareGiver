import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersService } from 'src/app/Core/Services/customers.service';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { Patient } from 'src/app/Core/Interfaces/patient';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-topside',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './admin-topside.component.html',
  styleUrls: ['./admin-topside.component.scss'],
})
export class AdminTopsideComponent implements OnInit {
  Admin: Patient | undefined;
  constructor(
    private _CustomersService: CustomersService,
    private _AuthService: AuthService,
    private _Router: Router
  ) {}
  ngOnInit(): void {
    this.displayAdmin();
  }
  displayAdmin() {
    const id = this._AuthService.decodeUserData().nameid;
    this._CustomersService.getCustomerById(id).subscribe({
      next: (response) => {
        this.Admin = response.result;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  logout() {
    this._AuthService.logOut();
    this._Router.navigate(['/signin']);
  }
}
