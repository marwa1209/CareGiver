import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from 'src/app/Core/Services/auth.service';

@Component({
  selector: 'app-admin-sidenav',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './admin-sidenav.component.html',
  styleUrls: ['./admin-sidenav.component.scss'],
})
export class AdminSidenavComponent {
  constructor(private _AuthService: AuthService, private _Router: Router) {}
  logout() {
    this._AuthService.logOut();
    this._Router.navigate(['/signin']);
  }
}
