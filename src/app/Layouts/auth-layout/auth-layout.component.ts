import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainNavComponent } from 'src/Components/main-nav/main-nav.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [CommonModule, MainNavComponent, RouterOutlet],
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss'],
})
export class AuthLayoutComponent {
}
