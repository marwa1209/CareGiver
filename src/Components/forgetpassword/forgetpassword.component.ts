import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationExtras, Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/Core/Services/auth.service';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss'],
})
export class ForgetpasswordComponent {
  forgetpasswordForm: FormGroup = new FormGroup({
    email: new FormControl(''),
  });
  message: string = '';
  isLoading: boolean = false;
  constructor(private _AuthService: AuthService, private _Router: Router) {}
  emailvalue: string = '';
  handleForgetpassword(emailvalue:string): void {
    this.emailvalue = emailvalue;
    this.isLoading = true;
    const email = this.forgetpasswordForm.value;
    this._AuthService.forgetPassword(email).subscribe({
      next: (response) => {
        if (response.statusMsg == 'success') {
          this.isLoading = false;
          this.message = response.message;

          this._Router.navigate(['/forgetpassword2'], {
            queryParams: { email: this.emailvalue },
          });
        }
      },
      error: (error) => {
        if (error.error.statusMsg == 'fail') {
          this.message = error.error.message;
        } else {
          this.message = error.error.errors.msg;
        }

        this.isLoading = false;
      },
    });
  }
}