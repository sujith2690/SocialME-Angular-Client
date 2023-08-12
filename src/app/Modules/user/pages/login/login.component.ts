
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Core/Services/AuthService/auth.service';
import { ToastrService } from 'ngx-toastr';
import { loginData } from '../../../../Core/Models/authDetails';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toast: ToastrService,

  ) { }
  loginSchema = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
  });
  get f() { return this.loginSchema.controls }
  private ngUnsubscribe = new Subject<void>();
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  onSubmit() {
    if (this.loginSchema.valid) {
      const formData = this.loginSchema.value;
      const data: loginData = {
        email: JSON.stringify(formData.email).replace(/['"]+/g, ""),
        password: JSON.stringify(formData.password).replace(/['"]+/g, "")
      }
      console.log(formData, '---------login data');
      this.authService.logIn(data).pipe(takeUntil(this.ngUnsubscribe)).subscribe((result) => {
        console.log(result, '--- -----login result')
        if (result.success) {
          localStorage.setItem('User', JSON.stringify(result.user));
          localStorage.setItem('Token', JSON.stringify(result.token));
          this.router.navigate(['']);
          this.toast.success('Login Success')
        }
        else {
          this.loginSchema.reset();
          this.toast.error('Invalid Email or Password')
        }
      })
      this.loginSchema.reset();
    } else {
      this.markAllFieldsAsTouched();
    }
  }
  // Helper function to mark all form fields as touched
  private markAllFieldsAsTouched() {
    Object.keys(this.loginSchema.controls).forEach(field => {
      const control = this.loginSchema.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }

}

