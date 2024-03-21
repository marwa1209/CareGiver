import { MainNavComponent } from 'src/Components/main-nav/main-nav.component';
import { Component, Directive, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from 'src/Components/footer/footer.component';
@Component({
  selector: 'app-blank-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MainNavComponent,
    FooterComponent,
    NgIf,
  ],
  templateUrl: './blank-layout.component.html',
  styleUrls: ['./blank-layout.component.scss'],
})
export class BlankLayoutComponent implements OnInit {
  isloggedUser: boolean = false;
  ngOnInit() {
    const encodeToken: any = localStorage.getItem('etoken');
    if (encodeToken !== null) {
      this.isloggedUser = true;
    } else {
      this.isloggedUser = false;
    }
  }
  goToUp(){
    scroll(0,0)
  
}
}
