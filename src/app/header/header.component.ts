import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router: Router) {
    console.log('HeaderComponent instantiated'); 
  }

  navigateTo(path: string): void {
    console.log('Navigating to:', path); 
    this.router.navigate([path]);
  }
}
