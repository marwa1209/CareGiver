import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/Core/Services/auth.service';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent {
  constructor(private _AuthService: AuthService) {}
  isLoading: boolean = false;
  message: string = '';
  RegisterForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    orderId: new FormControl(0),
    message: new FormControl('', [Validators.required]),
  });
  handleRegister(): void {
    this.isLoading = true;
    const userData = this.RegisterForm.value;
    if (this.RegisterForm.get('orderId')?.value == null) {
      this.RegisterForm.get('orderId')?.setValue(0);
    }
    if (this.RegisterForm.valid) {
      this._AuthService.constactus(userData).subscribe({
        next: (response) => {
          console.log(response);
          this.isLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
          if (err.status == 200) {
            this.message =
              'Your message has been successfully sent to caregiver@gmail.com.';
          } else {
            this.message =
              'Failed to send your message. Please try again later.';
          }
        },
      });
    } else {
      this.RegisterForm.markAllAsTouched;
    }
  }
}
