import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICaregiver } from 'src/app/Core/Interfaces/caregiver';
import { CareGiversService } from 'src/app/Core/Services/care-givers.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SearchPipe } from 'src/app/Core/Pipes/search.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-caregivers',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, SearchPipe],
  templateUrl: './caregivers.component.html',
  styleUrls: ['./caregivers.component.scss'],
})
export class CaregiversComponent implements OnInit {
  role!: string | null;
  term:string='';
  base64Image: string = '';
  caregivers: ICaregiver[] = [];
  constructor(
    private _CareGiversService: CareGiversService,
    private _ActivatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.base64Image = 'data:image/jpeg;base64,';
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.role = params.get('role');
      },
    });

    this._CareGiversService.getCareGiverByRole(this.role).subscribe({
      next: (data) => {
        this.caregivers = data;
        console.log(this.caregivers)
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
