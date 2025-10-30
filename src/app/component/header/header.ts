import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})

export class HeaderComponent implements OnInit {
  user: any;
  homeData: any;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    // Subscribe to the current user data from AuthService
    this.auth.currentUser$.subscribe(user => {
      if (!user) {
        // If no user is logged in, go to the login page
        this.user = null;
        this.router.navigate(['/login']);
        return;
      }

      // Set current user
      this.user = user;

      // If user has no home data, create default data
      if (!this.user.homeData) {
        this.user.homeData = { usersJoined: 0, eventsHosted: 0, posts: [] };
        this.auth.updateCurrentUserHomeData(this.user.homeData);
      }

      this.homeData = this.user.homeData;

      this.homeData.posts.forEach((p: any) => {
        if (p.liked === undefined) p.liked = false;
        if (p.showComment === undefined) p.showComment = false;
        if (p.newComment === undefined) p.newComment = '';
        if (!p.comments) p.comments = [];
      });
    });
  }

  // Log out and redirect to login
  logout() {
    this.auth.logout();
    this.user = null;
    this.router.navigate(['/login']);
  }

  // Like or unlike post
  likePost(index: number) {
    const post = this.homeData.posts[index];
    post.liked = !post.liked;
    post.likes = post.liked ? (post.likes || 0) + 1 : (post.likes || 1) - 1;
    this.auth.updateCurrentUserHomeData(this.homeData);
  }

  // Show or hide the comment box
  toggleCommentInput(index: number) {
    const post = this.homeData.posts[index];
    post.showComment = !post.showComment;
  }

  // Add new comment to post
  addComment(index: number) {
    const post = this.homeData.posts[index];
    if (!post.newComment?.trim()) return; // Skip if comment is empty
    post.comments.push({ user: this.user.name, text: post.newComment });
    post.newComment = '';
    this.auth.updateCurrentUserHomeData(this.homeData);
  }

  // Creating a post
addPost(title: string, text: string) {
  if (!this.homeData.posts) this.homeData.posts = [];
  this.homeData.posts.push({
    title,
    text,
    likes: 0,
    comments: [],
    userEmail: this.user.email,  
    showComment: false,
    newComment: ''
  });
  this.auth.updateCurrentUserHomeData(this.homeData);
}

}

