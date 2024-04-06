import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainNavComponent } from '../main-nav/main-nav.component';
import { NurseNavComponent } from '../nurse-nav/nurse-nav.component';
import { AdminSidenavComponent } from '../Admin/admin-sidenav/admin-sidenav.component';
import { AuthService } from 'src/app/Core/Services/auth.service';

@Component({
  selector: 'app-not-found',
  standalone: true,
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  imports: [
    CommonModule,
    MainNavComponent,
    NurseNavComponent,
    AdminSidenavComponent,
  ],
})
export class NotFoundComponent implements OnInit {
  constructor(private _AuthService: AuthService) {}
  isAdmin: boolean = false;
  iscaregiver: boolean = false;
  isPatientUser: boolean = false;
  role: string = '';
  ngOnInit() {
    if (this._AuthService.decodeUserData().role||
      localStorage.getItem('etoken') == null
    ) {
      var role=this._AuthService.decodeUserData().role;
      console.log(role)
      if ( role == 'AdminUser') {
        this.isAdmin = true;
      } else if (localStorage.getItem('etoken') == null ||role == 'PatientUser') {
        this.isPatientUser = true;
      } else if (role == 'CaregiverUser') {
        this.iscaregiver = true;
      }
    }
  }
}
