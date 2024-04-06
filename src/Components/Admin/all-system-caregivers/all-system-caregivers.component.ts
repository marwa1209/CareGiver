import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from 'src/app/Core/Services/admin.service';
import { ICaregiver } from 'src/app/Core/Interfaces/caregiver';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from 'src/app/Core/Pipes/search.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-all-system-caregivers',
  standalone: true,
  imports: [CommonModule,FormsModule,SearchPipe,RouterLink],
  templateUrl: './all-system-caregivers.component.html',
  styleUrls: ['./all-system-caregivers.component.scss'],
})
export class AllSystemCaregiversComponent implements OnInit {
  allcaregivers: ICaregiver[] = [];
  base64Image: string = '';
  term:string='';
  constructor(private _AdminService: AdminService) {}
  ngOnInit(): void {
    this.getAllcaregivers();
    this.base64Image = 'data:image/jpeg;base64,';
  }
  getAllcaregivers() {
    this._AdminService.getAllcaregiverssystem().subscribe({
      next: (data) => {
        this.allcaregivers = data;
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
