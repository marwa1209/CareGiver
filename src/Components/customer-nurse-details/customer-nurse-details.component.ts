import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CareGiversService } from 'src/app/Core/Services/care-givers.service';
import { ActivatedRoute } from '@angular/router';
import { ICaregiver } from 'src/app/Core/Interfaces/caregiver';

@Component({
  selector: 'app-customer-nurse-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-nurse-details.component.html',
  styleUrls: ['./customer-nurse-details.component.scss'],
})
export class CustomerNurseDetailsComponent implements OnInit {
  id: string | null = '';
  constructor(
    private _CareGiversService: CareGiversService,
    private _ActivatedRoute: ActivatedRoute
  ) {}
  caregiver: ICaregiver|null = null;
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('nurseId');
        console.log(this.id);
      },
    });

    this._CareGiversService.getCareGiverById(this.id).subscribe({
      next: (data) => {
        this.caregiver=data 
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
