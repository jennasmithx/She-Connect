import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  constructor(private auth: AuthService, private router: Router) {}

  onRegister(nameInput: HTMLInputElement, surnameInput: HTMLInputElement, emailInput: HTMLInputElement, passwordInput: HTMLInputElement) {
    try {
      this.auth.register(
        nameInput.value,
        surnameInput.value,
        emailInput.value,
        passwordInput.value
      );
      alert('✅ Registered successfully!');
      this.router.navigate(['/login']);
    } catch (err: any) {
      alert('❌ ' + err.message);
    }
  }
}
