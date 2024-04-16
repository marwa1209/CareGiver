import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CareGiversService } from 'src/app/Core/Services/care-givers.service';
import { ICaregiver } from 'src/app/Core/Interfaces/caregiver';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SearchPipe } from 'src/app/Core/Pipes/search.pipe';

@Component({
  selector: 'app-babysitters',
  standalone: true,
  imports: [CommonModule, RouterLink,FormsModule,SearchPipe],
  templateUrl: './babysitters.component.html',
  styleUrls: ['./babysitters.component.scss'],
})
export class BabysittersComponent implements OnInit {
  role!: string | null;
  term: string = '';
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
        console.log(this.caregivers);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
