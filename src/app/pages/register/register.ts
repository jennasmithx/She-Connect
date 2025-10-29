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

  // Handle user registration
  onRegister(
    nameInput: HTMLInputElement,
    surnameInput: HTMLInputElement,
    emailInput: HTMLInputElement,
    passwordInput: HTMLInputElement
  ) {
    try {
      // Call AuthService to register the new user
      this.auth.register(
        nameInput.value,
        surnameInput.value,
        emailInput.value,
        passwordInput.value
      );

      // Show success message and redirect to login page
      alert('✅ Registered successfully!');
      this.router.navigate(['/login']);
    } catch (err: any) {
      // Show error message if registration fails
      alert('❌ ' + err.message);
    }
  }
}
