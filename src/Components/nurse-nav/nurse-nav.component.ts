import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CareGiversService } from 'src/app/Core/Services/care-givers.service';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { ICaregiver } from 'src/app/Core/Interfaces/caregiver';

@Component({
  selector: 'app-nurse-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './nurse-nav.component.html',
  styleUrls: ['./nurse-nav.component.scss'],
})
export class NurseNavComponent implements OnInit {
  base64Image: string = '';
  caregiver: ICaregiver | null = null;
  role: any;
  state: string = '';
  constructor(
    private _Router: Router,
    private _CareGiversService: CareGiversService,
    private _AuthService: AuthService
  ) {}
  ngOnInit() {
    const id = this._AuthService.decodeUserData().nameid;
    this.base64Image = 'data:image/jpeg;base64,';
    this.state = this._AuthService.decodeUserData().Status;
    this._CareGiversService.getCareGiverById(id).subscribe({
      next: (data) => {
        this.caregiver = data.result;
        this.role = data.result.jobTitle;
        console.log(data.resulturs);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  SignOut() {
    localStorage.removeItem('etoken');
    this._Router.navigate(['/signin']);
  }
}
