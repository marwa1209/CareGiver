import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from 'src/app/Core/Services/admin.service';
import { ICaregiver } from 'src/app/Core/Interfaces/caregiver';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from 'src/app/Core/Pipes/search.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-manage-babysitters',
  standalone: true,
  imports: [CommonModule, FormsModule, SearchPipe, RouterLink],
  templateUrl: './manage-babysitters.component.html',
  styleUrls: ['./manage-babysitters.component.scss'],
})
export class ManageBabysittersComponent {
  term: string = '';
  base64Image: string = '';
  constructor(private _AdminService: AdminService) {}
  babysitters: ICaregiver[] | undefined = undefined;
  ngOnInit(): void {
    this.getAllbabysitters();
    this.base64Image = 'data:image/jpeg;base64,';
  }
  delete(id: string) {
    console.log(id);
    this._AdminService.deleteNurseById(id).subscribe({
      next: (data) => {
        console.log(data);
        this.getAllbabysitters();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getAllbabysitters() {
    this._AdminService.getAllbabysitters().subscribe({
      next: (data) => {
        this.babysitters = data;
        console.log(this.babysitters);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
