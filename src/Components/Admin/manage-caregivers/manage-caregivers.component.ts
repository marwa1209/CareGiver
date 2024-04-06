import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from 'src/app/Core/Services/admin.service';
import { ICaregiver } from 'src/app/Core/Interfaces/caregiver';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from 'src/app/Core/Pipes/search.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-manage-caregivers',
  standalone: true,
  imports: [CommonModule, FormsModule, SearchPipe, RouterLink],
  templateUrl: './manage-caregivers.component.html',
  styleUrls: ['./manage-caregivers.component.scss'],
})
export class ManageCaregiversComponent implements OnInit {
  term: string = '';
  base64Image: string = '';
  constructor(private _AdminService: AdminService) {}
  caregivers: ICaregiver[] | undefined = undefined;
  ngOnInit(): void {
    this.getAllCaregivers();
    this.base64Image = 'data:image/jpeg;base64,';
  }
  delete(id: string) {
    console.log(id);
    this._AdminService.deleteNurseById(id).subscribe({
      next: (data) => {
        console.log(data);
        this.getAllCaregivers();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getAllCaregivers() {
    this._AdminService.getAllCaregivers().subscribe({
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
