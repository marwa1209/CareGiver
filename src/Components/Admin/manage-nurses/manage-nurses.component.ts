import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from 'src/app/Core/Services/admin.service';
import { ICaregiver } from 'src/app/Core/Interfaces/caregiver';
import { SearchPipe } from 'src/app/Core/Pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-manage-nurses',
  standalone: true,
  imports: [CommonModule, SearchPipe, FormsModule, RouterLink],
  templateUrl: './manage-nurses.component.html',
  styleUrls: ['./manage-nurses.component.scss'],
})
export class ManageNursesComponent implements OnInit {
  term: string = '';
  id: string = '';
  base64Image: string = '';
  constructor(private _AdminService: AdminService) {}
  nurses: ICaregiver[] | undefined = undefined;
  ngOnInit(): void {
    this.getAllNurses();
    this.base64Image = 'data:image/jpeg;base64,';
  }
  delete(id: string) {
    this._AdminService.deleteNurseById(id).subscribe({
      next: (data) => {
        console.log(data);
        this.getAllNurses();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getAllNurses() {
    this._AdminService.getAllCareNurses().subscribe({
      next: (data) => {
        this.nurses = data;
        console.log(this.nurses);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
