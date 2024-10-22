import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatInputModule, MatCardModule, MatSelectModule, ReactiveFormsModule, MatButtonModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private service: AuthService, private router: Router) {
    this.registerForm = fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, {validator: matchingFields('password', 'confirmPassword')})
  }

  onSubmit() {
    delete this.registerForm.value.confirmPassword;
    this.service.register(this.registerForm.value).subscribe((data: any) => {
      localStorage.setItem('username', data.UserName);
      localStorage.setItem('token_value', data.Token);
      this.router.navigate(['/entries']);
    }, (error) => alert(error.error.Message));
  }

}

function matchingFields(field1: string, field2: string) {
  return (form: AbstractControl) => {
    const password = form.get(field1);
    const confirmPassword = form.get(field2);
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { matchingFields: true };
    }

    return null;
  }
}
