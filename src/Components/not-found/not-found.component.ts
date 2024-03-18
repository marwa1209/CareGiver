import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainNavComponent } from '../main-nav/main-nav.component';

@Component({
  selector: 'app-not-found',
  standalone: true,
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  imports: [CommonModule, MainNavComponent]
})
export class NotFoundComponent implements OnInit {
  isloggedUser: boolean = false;
  ngOnInit() {
    const encodeToken: any = localStorage.getItem('etoken');
    if (encodeToken !== null) {
      this.isloggedUser = true;
    } else {
      this.isloggedUser = false;
    }
  }
}
