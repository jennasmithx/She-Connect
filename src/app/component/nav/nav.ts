import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav.html',
  styleUrls: ['./nav.css']
})
export class NavComponent {
  constructor(public auth: AuthService, private router: Router) {}

  logout() {
  this.auth.logout();

  // Redirect to login
  this.router.navigate(['/login'], { replaceUrl: true });
}

sendEmergency() {
    alert('🚨 Emergency sent!');
}
}
