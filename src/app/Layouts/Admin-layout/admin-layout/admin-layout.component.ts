import { AdminSidenavComponent } from './../../../../Components/Admin/admin-sidenav/admin-sidenav.component';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AdminTopsideComponent } from 'src/Components/Admin/admin-topside/admin-topside.component';


@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, AdminSidenavComponent,RouterOutlet,RouterLink,RouterLinkActive ,AdminTopsideComponent],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent {}
