import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CareGiversService } from 'src/app/Core/Services/care-givers.service';
import { ICaregiver } from 'src/app/Core/Interfaces/caregiver';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  caregivers:ICaregiver[]=[];
  constructor(private _CareGiversService: CareGiversService) {}
  ngOnInit(): void {
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
