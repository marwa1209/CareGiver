import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Core/Services/auth.service';

@Component({
  selector: 'app-pending-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pending-page.component.html',
  styleUrls: ['./pending-page.component.scss'],
})
export class PendingPageComponent {
  userToken: boolean = false;
  constructor(private _Router: Router, private _AuthService: AuthService) {}
  ngOnInit() {
    console.log(this._AuthService.decodeUserData().Status);
    const encodeToken: any = localStorage.getItem('etoken');
    if (encodeToken !== null) {
      this.userToken = true;
    } else {
      this.userToken = false;
    }
  }
  SignOut() {
    this.userToken = false;
    localStorage.removeItem('etoken');
  }
  login() {
    this.SignOut();
    this._Router.navigate(['/signin']);
  }
}
