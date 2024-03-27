import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CareGiversService } from 'src/app/Core/Services/care-givers.service';
import { ICaregiver } from 'src/app/Core/Interfaces/caregiver';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-babysitters',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './babysitters.component.html',
  styleUrls: ['./babysitters.component.scss'],
})
export class BabysittersComponent implements OnInit {
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
