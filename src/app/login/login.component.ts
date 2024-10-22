import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCard
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginData = {
    userName: '',
    password: ''
  }

  constructor(private service: AuthService, private router: Router) { }

  login() {
    this.service.login(this.loginData).subscribe((data: any) => {
      localStorage.setItem('username', data.UserName);
      localStorage.setItem('token_value', data.Token);
      this.router.navigate(['/entries']);
    },
      (error) => alert(error.error.Message));
  }

}
