import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Core/Services/AuthService/auth.service';
import { ToastrService } from 'ngx-toastr';
import { signupData } from '../../../../Core/Models/authDetails';

// Custom validator function for password match
function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  return password === confirmPassword ? null : { passwordMismatch: true };
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  signUpSchema: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toast: ToastrService,
  ) {
    this.signUpSchema = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(3)]],
    }, { validators: passwordMatchValidator }); // Use the custom validator function here
  }

  get f() {
    return this.signUpSchema.controls;
  }

  onSubmit() {
    if (this.signUpSchema.valid) {
      const formData = this.signUpSchema.value;
      console.log(formData, '--------formData')
      // this.authService.signUp(formData)
      const data: signupData = {
        firstname: JSON.stringify(formData.firstName).replace(/['"]+/g, ""),
        lastname: JSON.stringify(formData.lastName).replace(/['"]+/g, ""),
        username: JSON.stringify(formData.email).replace(/['"]+/g, ""),
        password: JSON.stringify(formData.password).replace(/['"]+/g, "")
      }
      this.authService.signUp(data).subscribe((result) => {
        console.log(result, '--- -----login result')
        if (result.success) {
          this.toast.success(result.message)
          localStorage.setItem('User',JSON.stringify(result.user));
          localStorage.setItem('Token', JSON.stringify(result.token));
          this.router.navigate(['']);
          this.signUpSchema.reset();
        }
        else {
          this.toast.error(result.message)
          this.signUpSchema.reset();
        }
      })
    } else {
      this.markAllFieldsAsTouched();
    }
  }

  // Helper function to mark all form fields as touched
  private markAllFieldsAsTouched() {
    Object.keys(this.signUpSchema.controls).forEach(field => {
      const control = this.signUpSchema.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }
}
