import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  constructor(private auth: AuthService, private router: Router) {}

  // Authorise Login
  onLogin(emailInput: HTMLInputElement, passwordInput: HTMLInputElement) {
    if (this.auth.login(emailInput.value, passwordInput.value)) {
      alert('✅ Login successful!');
      this.router.navigate(['/']);
    } else {
      alert('❌ Invalid email or password.');
    }
  }
}
