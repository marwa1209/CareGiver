import { Component, OnInit } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { CareGiversService } from 'src/app/Core/Services/care-givers.service';
import { ICaregiver } from 'src/app/Core/Interfaces/caregiver';
import { NavigationEnd, RouterLink, RouterModule, Routes ,Router} from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from 'src/app/Core/Services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  caregivers: ICaregiver[] = [];
  constructor(
    private _CareGiversService: CareGiversService,
    private _AuthService:AuthService,
    private _viewportScroller: ViewportScroller,
    private router: Router
  ) {
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
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
