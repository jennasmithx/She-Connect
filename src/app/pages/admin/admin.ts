import { Component, OnInit } from '@angular/core';
import { GraphsComponent } from '../graphs/graphs';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

interface User {
  name: string;
  surname: string;
  email: string;
  role: string;
  homeData?: {
    usersJoined: number;
    eventsHosted: number;
    posts: any[];
  };
}

@Component({
  selector: 'app-admin',
  imports: [GraphsComponent, RouterModule],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class AdminComponent implements OnInit {
  allUsers: User[] = [];
  totalUsers = 0;

  ngOnInit() {
    // Fetch users from localStorage
    let users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

    // Prefill users if empty
    if (!users.length) {
      users = [
        { name: 'Alice', surname: 'Smith', email: 'alice@test.com', role: 'user', homeData: { usersJoined:0, eventsHosted:0, posts:[] } },
        { name: 'Bob', surname: 'Admin', email: 'admin@email.com', role: 'admin', homeData: { usersJoined:0, eventsHosted:0, posts:[] } }
      ];
      localStorage.setItem('users', JSON.stringify(users));
    }

    this.allUsers = users;
    this.totalUsers = users.length;
  }

  constructor(private auth: AuthService, private router: Router) {}

goToEditUsers() {
  this.router.navigate(['/admin/edit-users']);
  
}
}
