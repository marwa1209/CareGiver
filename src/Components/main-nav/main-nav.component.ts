import { Patient } from 'src/app/Core/Interfaces/patient';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { CustomersService } from 'src/app/Core/Services/customers.service';

@Component({
  selector: 'app-main-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
})
export class MainNavComponent implements OnInit {
  userToken: boolean = false;
  id:string='';
  Patientdata: Patient | undefined;
  constructor(
    private _Router: Router,
    private _AuthService: AuthService,
    private _CustomersService: CustomersService
  ) {}
  ngOnInit() {
    const encodeToken: any = localStorage.getItem('etoken');
    if (encodeToken !== null) {
      this.userToken = true;
    } else {
      this.userToken = false;
    }
    this.id = this._AuthService.decodeUserData().nameid;
    this.data()
  }
  SignOut() {
    this.userToken = false;
    this._AuthService.logOut();
    this._Router.navigate(['/home']);
  }
  data() {
    this._CustomersService.getCustomerById(this.id).subscribe({
      next: (data) => {
        this.Patientdata = data.result;
        console.log(data.result);
      },
    });
  }
}
