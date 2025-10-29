import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-addprofile',
  standalone: true,
  templateUrl: './addprofile.html',
  styleUrls: ['./addprofile.css']
})
export class AddprofileComponent implements OnInit {
  users: User[] = [];
  errorMsg = '';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.users = JSON.parse(localStorage.getItem('users') || '[]');
  }

  addProfile(firstName: string, lastName: string, email: string, password: string) {
    if (!firstName || !lastName || !email || !password) {
      this.errorMsg = 'All fields are required!';
      return;
    }

    const loggedInEmail = this.auth.getCurrentUser()?.email;
    if (!loggedInEmail) {
      this.errorMsg = 'No logged-in user!';
      return;
    }

    try {
      // Add profile through AuthService
      this.auth.addProfile({
        name: firstName,
        surname: lastName,
        email,
        password,
        parentEmail: loggedInEmail, // link child profile
        homeData: { usersJoined: 0, eventsHosted: 0, posts: [] }
      });

      // Reload users from localStorage so visibleProfiles updates
      this.loadUsers();

      this.errorMsg = '';
      alert('✅ Profile added!');
    } catch (err: any) {
      this.errorMsg = err.message;
    }
  }

  editProfile(user: User) {
    this.router.navigate(['/edit'], { state: { user } });
  }

  deleteProfile(email: string) {
    if (!confirm('Are you sure you want to delete this profile?')) return;

    let users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    users = users.filter(u => u.email !== email && u.parentEmail !== email);
    localStorage.setItem('users', JSON.stringify(users));
    this.loadUsers();
  }

  // Only show logged-in user + their child profiles
  get visibleProfiles() {
    const loggedInEmail = this.auth.getCurrentUser()?.email;
    if (!loggedInEmail) return [];
    return this.users.filter(u => u.email === loggedInEmail || u.parentEmail === loggedInEmail);
  }
}
