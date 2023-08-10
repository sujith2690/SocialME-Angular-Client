import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';

// Custom validator function for password match
function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  console.log('------------------sdsdds---------')
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

  constructor(private fb: FormBuilder, private router: Router) {
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
      sessionStorage.setItem('userData', JSON.stringify(formData));
      this.signUpSchema.reset();
      this.router.navigate(['']);
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
