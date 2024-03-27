import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICaregiver } from 'src/app/Core/Interfaces/caregiver';
import { CareGiversService } from 'src/app/Core/Services/care-givers.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-caregivers',
  standalone: true,
  imports: [CommonModule ,RouterLink],
  templateUrl: './caregivers.component.html',
  styleUrls: ['./caregivers.component.scss'],
})
export class CaregiversComponent implements OnInit{
  role!: string | null;
  caregivers: ICaregiver[] = [];
  constructor(
    private _CareGiversService: CareGiversService,
    private _ActivatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.role = params.get('role');
      },
    });

    this._CareGiversService.getCareGiverByRole(this.role).subscribe({
      next: (data) => {
        this.caregivers = data.result;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
