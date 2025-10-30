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

  // Authorize Login
  onLogin(emailInput: HTMLInputElement, passwordInput: HTMLInputElement) {
    const success = this.auth.login(emailInput.value, passwordInput.value);

    if (success) {
      const user = this.auth.getCurrentUser();

      if (user) {
        // Redirect based on role/email
        if (user.email === 'admin@gmail.com' && user.password === '55555') {
          this.router.navigate(['/admin']);
        } else if (user.email === 'mentor@gmail.com' && user.password === '55555') {
          this.router.navigate(['/mentor']);
        } else {
          this.router.navigate(['/']); 
        }

        alert('✅ Login successful!');
      }
    } else {
      alert('❌ Invalid email or password.');
    }
  }
}
