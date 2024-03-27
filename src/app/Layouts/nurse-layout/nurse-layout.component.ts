import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NurseNavComponent } from 'src/Components/nurse-nav/nurse-nav.component';

@Component({
  selector: 'app-nurse-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NurseNavComponent],
  templateUrl: './nurse-layout.component.html',
  styleUrls: ['./nurse-layout.component.scss'],
})
export class NurseLayoutComponent implements OnInit {
  isloggedUser: boolean = false;
  ngOnInit() {
    const encodeToken: any = localStorage.getItem('etoken');
    if (encodeToken !== null) {
      this.isloggedUser = true;
    } else {
      this.isloggedUser = false;
    }
  }
  goToUp() {
    scroll(0, 0);
  }
}
