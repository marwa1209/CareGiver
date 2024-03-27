import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from 'src/app/Core/Services/admin.service';
import { ICaregiver } from 'src/app/Core/Interfaces/caregiver';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from 'src/app/Core/Pipes/search.pipe';

@Component({
  selector: 'app-manage-caregivers',
  standalone: true,
  imports: [CommonModule ,FormsModule ,SearchPipe],
  templateUrl: './manage-caregivers.component.html',
  styleUrls: ['./manage-caregivers.component.scss'],
})
export class ManageCaregiversComponent implements OnInit {
  term:string='';
  constructor(private _AdminService: AdminService) {}
  caregivers: ICaregiver[] | undefined = undefined;
  ngOnInit(): void {
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
  delete(id: string) {
    this._AdminService.deleteNurseById(id).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
