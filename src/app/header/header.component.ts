import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router: Router, public auth: AuthService) {
    console.log('HeaderComponent instantiated'); 
  }

  navigateTo(path: string): void {
    console.log('Navigating to:', path); 
    this.router.navigate([path]);
  }
}
