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

  // Add a profile
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

    // Authorise
    try {
      this.auth.addProfile(newUser);
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
    // Redirect to Edit page
    this.router.navigate(['/edit'], { state: { user } });
  }

  // Delete Profile
  deleteProfile(email: string) {
    if (!confirm('Are you sure you want to delete this profile?')) return;
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const updated = users.filter((u: User) => u.email !== email);
    localStorage.setItem('users', JSON.stringify(updated));
    this.users = updated;
  }
}
