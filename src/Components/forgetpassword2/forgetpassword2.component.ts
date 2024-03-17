import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ForgetpasswordComponent } from '../forgetpassword/forgetpassword.component';

@Component({
  selector: 'app-forgetpassword2',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    FormsModule,
    ForgetpasswordComponent,
  ],
  templateUrl: './forgetpassword2.component.html',
  styleUrls: ['./forgetpassword2.component.scss'],
})
export class Forgetpassword2Component {
  forgetpasswordForm: FormGroup = new FormGroup({
    resetCode: new FormControl(''),
  });
  message: string = '';
  success: boolean = false;
  isLoading: boolean = false;
  formattedTime: string = '10:00';
  totalSeconds: number = 600;
  timerDurationInSeconds: number = 600;
  timerInterval: any;
  email: string = '';
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _ActivatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.startTimer();
    this._ActivatedRoute.queryParams.subscribe((params) => {
      this.email = params['email'];
    });
  }
  emailvalue: string = '';
  handleForgetpassword(emailvalue: string): void {
    this.emailvalue = emailvalue;
    this.isLoading = true;
    const resetCode = this.forgetpasswordForm.value;
    console.log(resetCode);
    this._AuthService.verifyResetCode(resetCode).subscribe({
      next: (response) => {
        if (response.status == 'Success') {
          this.isLoading = false;
          this.message = response.message;
          this.success = true;
          console.log(response);
          this._Router.navigate(['/updatePassword'], {
          queryParams: { email1: this.email },
          });

          this.restartTimer();
        }
      },
      error: (error) => {
        this.success = false;
        if (error.error.statusMsg == 'fail') {
          this.message = error.error.message;
        } else {
          this.message = error.error.errors.msg;
        }

        this.isLoading = false;
      },
    });
  }

  resendpassword(emailvalue: string) {
    emailvalue = this.email;
    const email = { email: emailvalue };
    this._AuthService.forgetPassword(email).subscribe({
      next: (response) => {
        if (response.statusMsg == 'success') {
          this.isLoading = false;
          this.message = response.message;
          this.restartTimer();
          this.success = true;
          console.log(response);
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.success = false;
        if (error.error.statusMsg == 'fail') {
          this.message = error.error.message;
        } else {
          this.message = error.error.errors.msg;
        }
      },
    });
  }

  restartTimer(): void {
    clearInterval(this.timerInterval);
    this.totalSeconds = this.timerDurationInSeconds;
    this.startTimer();
  }

  startTimer(): void {
    this.timerInterval = setInterval(() => {
      this.totalSeconds--;
      const minutes = Math.floor(this.totalSeconds / 60);
      const seconds = this.totalSeconds % 60;
      this.formattedTime = `${this.padZero(minutes)}:${this.padZero(seconds)}`;
      if (this.totalSeconds <= 0) {
        clearInterval(this.timerInterval);
      }
    }, 1000);
  }

  padZero(num: number): string {
    return num < 10 ? '0' + num : '' + num;
  }
}
