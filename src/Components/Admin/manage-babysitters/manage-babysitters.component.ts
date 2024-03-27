import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from 'src/app/Core/Services/admin.service';
import { ICaregiver } from 'src/app/Core/Interfaces/caregiver';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from 'src/app/Core/Pipes/search.pipe';

@Component({
  selector: 'app-manage-babysitters',
  standalone: true,
  imports: [CommonModule,FormsModule,SearchPipe],
  templateUrl: './manage-babysitters.component.html',
  styleUrls: ['./manage-babysitters.component.scss'],
})
export class ManageBabysittersComponent {
  term:string=''
  constructor(private _AdminService: AdminService) {}
  babysitters: ICaregiver[] | undefined = undefined;
  ngOnInit(): void {
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
