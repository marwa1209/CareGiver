import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
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
  handleForgetpassword(emailvalue: string): void {
    this.emailvalue = emailvalue;
    this.isLoading = true;
    const email: any = this.forgetpasswordForm.value;
    this._AuthService.forgetPassword(email).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.message = response.message;     
        console.log(response);
      },
      error: (error) => {
        console.log(error.error);
        this.isLoading = false;
      },
    });
  }
}
