import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from 'src/app/Core/Pipes/search.pipe';
import { ICaregiver } from 'src/app/Core/Interfaces/caregiver';
import { AdminService } from 'src/app/Core/Services/admin.service';

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [CommonModule, FormsModule, SearchPipe, RouterLink],
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss'],
})
export class RequestsComponent {
  base64Image: string = '';
  term: string = '';
  state: string = '';
  caregivers: ICaregiver[] = [];
  constructor(private _AdminService: AdminService) {
    this.base64Image = 'data:image/jpeg;base64,';
  }
  ngOnInit(): void {
    this.AllrequestsData();
  }
  accept(id: any) {
    setTimeout(() => {
      this._AdminService.acceptRequest(id).subscribe({
        next: (data) => {
          console.log(data);
          this.AllrequestsData();
        },
        error: (err) => {
          console.log('Error updating status:', err);
        },
      });
    }, 100);
  }
  decline(id: any) {
    setTimeout(() => {
      this._AdminService.deleteRequest(id).subscribe({
        next: (data) => {
          console.log(data);
          this.AllrequestsData();
        },
        error: (err) => {
          console.log('Error updating status:', err);
        },
      });
    }, 100);
  }
  AllrequestsData() {
    this._AdminService.getAllRequests().subscribe({
      next: (Response) => {
        this.caregivers = Response;
        console.log(this.caregivers);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
