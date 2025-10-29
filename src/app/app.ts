import { Component, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavComponent } from './component/nav/nav';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, NavComponent, RouterModule, RouterOutlet],
  template: `
    <app-nav *ngIf="auth.isLoggedIn()"></app-nav>
    <router-outlet></router-outlet>
  `,
  styleUrl: './app.css'
})
export class AppComponent {
  constructor(public auth: AuthService) {}
}
