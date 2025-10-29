import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

interface User {
  name: string;
  surname: string;
  email: string;
  password: string;
  homeData?: {
    usersJoined: number;
    eventsHosted: number;
    posts: any[];
  };
}

@Component({
  selector: 'app-addprofile',
  standalone: true,
  templateUrl: './addprofile.html',
  styleUrls: ['./addprofile.css']
})
export class AddprofileComponent implements OnInit {
  users: User[] = [];

  // Form fields
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  errorMsg = '';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    // Load all users for preview
    this.users = JSON.parse(localStorage.getItem('users') || '[]');
  }

  addProfile() {
    if (!this.firstName || !this.lastName || !this.email || !this.password) {
      this.errorMsg = 'All fields are required!';
      return;
    }

    const newUser: User = {
      name: this.firstName,
      surname: this.lastName,
      email: this.email,
      password: this.password,
      homeData: { usersJoined: 0, eventsHosted: 0, posts: [] }
    };

    try {
      this.auth.addProfile(newUser); // Make sure your AuthService.addProfile accepts homeData
      alert('✅ Profile added!');
      // Reset form
      this.firstName = '';
      this.lastName = '';
      this.email = '';
      this.password = '';
      this.errorMsg = '';
      // Refresh user list
      this.users = JSON.parse(localStorage.getItem('users') || '[]');
    } catch (err: any) {
      this.errorMsg = err.message;
    }
  }

  editProfile(user: User) {
    // For simplicity, redirect to your Edit page (implement EditComponent separately)
    this.router.navigate(['/edit'], { state: { user } });
  }

  deleteProfile(email: string) {
    if (!confirm('Are you sure you want to delete this profile?')) return;
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const updated = users.filter((u: User) => u.email !== email);
    localStorage.setItem('users', JSON.stringify(updated));
    this.users = updated;
  }
}
