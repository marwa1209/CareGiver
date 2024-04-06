import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ICaregiver } from 'src/app/Core/Interfaces/caregiver';
import { CareGiversService } from 'src/app/Core/Services/care-givers.service';
import { SearchPipe } from 'src/app/Core/Pipes/search.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterLink, SearchPipe, FormsModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnInit {
  term: string = '';
  base64Image: string = '';
  caregivers: ICaregiver[] = [];
  constructor(private _CareGiversService: CareGiversService) {}
  ngOnInit(): void {
        this.base64Image = 'data:image/jpeg;base64,';
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
