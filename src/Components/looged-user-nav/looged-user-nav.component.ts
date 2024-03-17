import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-looged-user-nav',
  standalone: true,
  imports: [CommonModule, RouterLinkActive, RouterLink],
  templateUrl: './looged-user-nav.component.html',
  styleUrls: ['./looged-user-nav.component.scss'],
})
export class LoogedUserNavComponent {
  constructor(private _AuthService: AuthService, private _Router: Router) {}
  SignOut() {
    this._AuthService.logOut();
    this._Router.navigate(['/home']).then(() => {
      location.reload();
    });
  }
}
