import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './settings.html',
  styleUrls: ['./settings.css']
})
export class SettingsComponent {
  user: any;
  currentPassword = '';
  newPassword = '';
  confirmPassword = '';
  message = '';

  constructor(private auth: AuthService, private router: Router) {
    this.user = this.auth.getCurrentUser();

    // Redirect to login if not logged in
    if (!this.user) {
      this.router.navigate(['/login']);
    }
  }

  // Update Profile
  updateProfile() {
  if (!this.user.name || !this.user.surname) {
    this.message = 'Name and surname cannot be empty.';
    return;
  }

  // Update the main users array
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const idx = users.findIndex((u: any) => u.email === this.user.email);
  if (idx !== -1) {
    users[idx].name = this.user.name;
    users[idx].surname = this.user.surname;
    localStorage.setItem('users', JSON.stringify(users));
  }

  // Update current session
  localStorage.setItem('currentUser', JSON.stringify(this.user));

  // Optionally update homeData if needed
  this.auth.updateCurrentUserHomeData(this.user.homeData);

  this.message = 'Profile updated successfully ✅';
}

  // Change Password
  changePassword() {
    if (this.user.password !== this.currentPassword) {
      this.message = 'Password is incorrect ❌';
      return;
    }

    if (!this.newPassword || this.newPassword !== this.confirmPassword) {
      this.message = 'Passwords must match ❌';
      return;
    }

    // Update Password
    this.user.password = this.newPassword;
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const index = users.findIndex((u: any) => u.email === this.user.email);
    users[index] = this.user;
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(this.user));

    this.currentPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
    this.message = 'Password changed successfully ✅';
  }

  // Delete Account
  deleteAccount() {
    if (!confirm('Are you sure you want to delete your account? ❌')) return;

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const filteredUsers = users.filter((u: any) => u.email !== this.user.email);
    localStorage.setItem('users', JSON.stringify(filteredUsers));
    localStorage.removeItem('currentUser');

    this.router.navigate(['/login']);
  }

  //Logout User
  logout() {
    this.auth.logout();
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
