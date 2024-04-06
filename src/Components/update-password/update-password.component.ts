import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormControl,
  FormControlOptions,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-update-password',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss'],
})
export class UpdatePasswordComponent {
  message: string = '';
  email: string = '';
  token:string='';
  isLoading: boolean = false;
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _ActivatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this._ActivatedRoute.queryParams.subscribe((params) => {
      this.email = params['email1'];
      console.log(this.email);
    });
    this._ActivatedRoute.queryParams.subscribe((params) => {
      this.email = params['email'];
      this.token = params['token'];
      console.log(this.email);
      console.log(this.token);
    });
  }

  UpdatePasswordForm: FormGroup = new FormGroup(
    {
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/),
      ]),
      rePassword: new FormControl(''),
    },
    { validators: [this.confirmPassword] } as FormControlOptions
  );
  confirmPassword(group: FormGroup): void {
    let password = group.get('password');
    let rePassword = group.get('rePassword');
    if (password?.value == '') {
      rePassword?.setErrors({ required: true });
    } else if (
      password?.value !== rePassword?.value &&
      rePassword?.value !== ''
    ) {
      rePassword?.setErrors({ missmatch: true });
    }
  }
  handleupdate(email: string): void {
    this.isLoading = true;
    if (this.UpdatePasswordForm.valid) {
      this._AuthService
        .updatePass(this.email,this.token,this.UpdatePasswordForm.get('rePassword')?.value)
        .subscribe({
          next: (response) => {
            this.isLoading = false;
            console.log(response)
            this._Router.navigate(['/signin']);
          },
          error: (error) => {
            this.message = error.error.message;
            console.log(error.error);
            this.isLoading = false;
          },
        });
    } else {
      this.UpdatePasswordForm.markAllAsTouched(); // Method call corrected
    }
  }
  togglePasswordVisibility(inputField: HTMLInputElement): void {
    inputField.type = inputField.type === 'password' ? 'text' : 'password';
  }
}
