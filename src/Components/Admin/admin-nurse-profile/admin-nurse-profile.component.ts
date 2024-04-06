import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CareGiversService } from 'src/app/Core/Services/care-givers.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ICaregiver } from 'src/app/Core/Interfaces/caregiver';
import { FormsModule } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-admin-nurse-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, PdfViewerModule],
  templateUrl: './admin-nurse-profile.component.html',
  styleUrls: ['./admin-nurse-profile.component.scss'],
})
export class AdminNurseProfileComponent implements OnInit {
  base64Image: string = '';
  base64Pdf: any = '';
  displayresume: boolean = false;
  displaycriminalRecords: boolean = false;
  id: string | null = '';
  todaydate: string = '';
  maxDate: string = '';
  maxDateEnd: string = '';
  startDate: string = '';
  endDate: string = '';
  caregiver: ICaregiver | null = null;
  constructor(
    private _CareGiversService: CareGiversService,
    private _ActivatedRoute: ActivatedRoute
  ) {
    this.base64Image = 'data:image/jpeg;base64,';
    this.base64Pdf = `data:application/pdf;base64,`;
    //date
    const today = new Date();
    this.todaydate = today.toISOString().split('T')[0];
    const maxDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 7
    );
    const maxDateEnd = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 14
    );
    this.maxDate = maxDate.toISOString().split('T')[0];
    this.maxDateEnd = maxDateEnd.toISOString().split('T')[0];
    this.startDate = this.todaydate;
    this.endDate = this.todaydate;
  }
  calculateDays(): number {
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);
    const timeDifference = end.getTime() - start.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return Math.max(1, daysDifference);
  }
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('nurseId');
        console.log(this.id);
      },
    });

    this._CareGiversService.getCareGiverById(this.id).subscribe({
      next: (data) => {
        this.caregiver = data.result;
        if (this.caregiver?.gender == 2) {
          this.caregiver.gender = 'Female';
        } else if (this.caregiver?.gender == 1) {
          this.caregiver.gender = 'Male';
        }
        if (this.caregiver?.jobTitle == 1) {
          this.caregiver.jobTitle = 'Nurse';
        } else if (this.caregiver?.jobTitle == 2) {
          this.caregiver.jobTitle = 'Caregiver';
        } else if (this.caregiver?.jobTitle == 3) {
          this.caregiver.jobTitle = 'Babysitter';
        }
        if (this.caregiver?.careerLevel == 1) {
          this.caregiver.careerLevel = 'Student';
        } else if (this.caregiver?.careerLevel == 2) {
          this.caregiver.careerLevel = 'FreshGraduate';
        } else if (this.caregiver?.careerLevel == 3) {
          this.caregiver.careerLevel = 'Experienced';
        }
        if (this.caregiver?.city == 1) {
          this.caregiver.city = 'Cairo';
        } else if (this.caregiver?.city == 2) {
          this.caregiver.city = 'Alexandria';
        } else if (this.caregiver?.city == 3) {
          this.caregiver.city = 'AboTesht';
        }
        console.log(this.caregiver);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  showresume() {
    this.displayresume = true;
  }
  closere() {
    this.displayresume = false;
  }
  showcriminalRecords() {
    this.displaycriminalRecords = true;
  }
  closec() {
    this.displaycriminalRecords = false;
  }
}
