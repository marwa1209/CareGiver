import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-registernurse2',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './registernurse2.component.html',
  styleUrls: ['./registernurse2.component.scss'],
})
export class Registernurse2Component {
  RegisterForm: FormGroup = new FormGroup({
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^1[0125][0-9]{8}$/),
    ]),
  });
  handleRegister(): void {
    const userData = this.RegisterForm.value;
    console.log(userData);
    if (this.RegisterForm.valid) {
     console.log(this.RegisterForm.value);
    } else {
      this.RegisterForm.markAllAsTouched;
    }
  }
}
