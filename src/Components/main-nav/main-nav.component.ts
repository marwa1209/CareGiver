import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from 'src/app/Core/Services/auth.service';

@Component({
  selector: 'app-main-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
})
export class MainNavComponent implements OnInit {
  userToken: boolean = false;
  constructor(private _Router: Router) {}
  ngOnInit() {
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
    this._Router.navigate(['/home']);
  }
}
