import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class ProfileComponent implements OnInit {
  @ViewChild('postContent') postContent!: ElementRef<HTMLTextAreaElement>;
  userData: any;
  posts: any[] = [];
  imageFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  errorMsg = '';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    const user = this.auth.getCurrentUser();
    if (!user) {
      this.router.navigate(['/login'], { replaceUrl: true });
      return;
    }
    this.userData = user;

    // Initialize homeData if missing
    if (!this.userData.homeData) {
      this.userData.homeData = { usersJoined: 0, eventsHosted: 0, posts: [] };
      this.auth.updateCurrentUserHomeData(this.userData.homeData);
    }

    // Load posts reactively
    this.auth.currentUser$.subscribe(u => {
      if (u && u.homeData) {
        this.posts = u.homeData.posts;
        this.userData = u; // keep latest user info
      }
    });
  }

  // Upload File For Post
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      this.errorMsg = 'Only JPEG, PNG, or WEBP images are allowed.';
      this.resetImage();
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      this.errorMsg = 'Image must be smaller than 3MB.';
      this.resetImage();
      return;
    }

    this.imageFile = file;
    this.errorMsg = '';

    const reader = new FileReader();
    reader.onload = e => (this.imagePreview = (e.target as FileReader).result);
    reader.readAsDataURL(file);
  }

  resetImage() {
    this.imageFile = null;
    this.imagePreview = null;
  }

  // Create Post
  createPost(event: Event) {
    event.preventDefault();
    this.errorMsg = '';

    const content = this.postContent.nativeElement.value.trim();
    if (!content) {
      this.errorMsg = 'Post content cannot be empty!';
      return;
    }

    if (!this.userData) {
      this.errorMsg = 'You must be logged in to post.';
      return;
    }

    const newPost = {
      content,
      image: this.imagePreview || null,
      createdAt: new Date(),
      name: this.userData.name || 'Anonymous',
      surname: this.userData.surname || ''
    };

    // Push to posts
    this.userData.homeData.posts.push(newPost);
    this.auth.updateCurrentUserHomeData(this.userData.homeData); // reactive update

    // Reset form
    this.postContent.nativeElement.value = '';
    this.resetImage();
  }
}
