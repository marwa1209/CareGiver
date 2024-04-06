import { Component, OnInit } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { CareGiversService } from 'src/app/Core/Services/care-givers.service';
import { ICaregiver } from 'src/app/Core/Interfaces/caregiver';
import {
  NavigationEnd,
  RouterLink,
  Router,
} from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from 'src/app/Core/Pipes/search.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink,FormsModule,SearchPipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  userToken: boolean = false;
  term:string='';
  caregivers: ICaregiver[] = [];
  base64Image: string = '';
  constructor(
    private _CareGiversService: CareGiversService,
    private _AuthService: AuthService,
    private _viewportScroller: ViewportScroller,
    private router: Router
  ) {
    this.base64Image = 'data:image/jpeg;base64,';
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this._viewportScroller.scrollToPosition([0, 0]);
      });
  }
  ngOnInit(): void {
    const x = this._AuthService.decodeUserData();
    this._CareGiversService.getCareGivers().subscribe({
      next: (data) => {
        this.caregivers = data.result;
        console.log(this.caregivers);
      },
      error: (err) => {
        console.log(err);
      },
    });
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
    this.router.navigate(['/registerFormCaregiver']);
  }
}
