import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-createpost',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './createpost.html',
  styleUrls: ['./createpost.css']
})
export class CreatepostComponent {
  @ViewChild('postContent') postContent!: ElementRef<HTMLTextAreaElement>;
  imageFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  userData: any;
  errorMsg = '';

  constructor(private auth: AuthService, private router: Router) {
    // Fetch current user from AuthService
    this.userData = this.auth.getCurrentUser();
    if (!this.userData) {
      this.router.navigate(['/login'], { replaceUrl: true });
    }

    // Initialize homeData if missing
    if (!this.userData.homeData) {
      this.userData.homeData = { usersJoined: 0, eventsHosted: 0, posts: [] };
      this.auth.updateCurrentUserHomeData(this.userData.homeData);
    }
  }

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

    this.errorMsg = '';
    this.imageFile = file;

    const reader = new FileReader();
    reader.onload = e => this.imagePreview = (e.target as FileReader).result;
    reader.readAsDataURL(file);
  }

  resetImage() {
    this.imageFile = null;
    this.imagePreview = null;
  }

  createPost(event: Event) {
  event.preventDefault();
  this.errorMsg = '';

  const content = this.postContent.nativeElement.value.trim();
  if (!content) { this.errorMsg = 'Post content cannot be empty!'; return; }

  if (!this.userData) { this.errorMsg = 'You must be logged in to post.'; return; }

  const newPost = {
    content,
    image: this.imagePreview || null,
    createdAt: new Date(),
    name: this.userData.name || 'Anonymous',
    surname: this.userData.surname || ''
  };

  // Add post to user homeData
  this.userData.homeData.posts.push(newPost);
  this.auth.updateCurrentUserHomeData(this.userData.homeData); // triggers updates

  this.postContent.nativeElement.value = '';
  this.resetImage();

  alert('Post shared successfully 💖');
  this.router.navigate(['/profile'], { replaceUrl: true });
}
}
