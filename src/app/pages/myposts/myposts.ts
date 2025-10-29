import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-myposts',
  standalone: true,
   imports: [CommonModule, DatePipe],
  templateUrl: './myposts.html',
  styleUrls: ['./myposts.css']
})
export class MypostsComponent implements OnInit {
  posts: any[] = [];

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.currentUser$.subscribe(user => {
      if (user && user.homeData) {
        this.posts = user.homeData.posts || [];
      } else {
        this.posts = [];
      }
    });
  }
}
