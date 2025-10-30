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
  // Get the text area
  @ViewChild('postContent') postContent!: ElementRef<HTMLTextAreaElement>;

  // Variables for images and user data
  imageFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  userData: any;
  errorMsg = '';

  constructor(private auth: AuthService, private router: Router) {
    // Get the current logged-in user
    this.userData = this.auth.getCurrentUser();

    // Redirect to login if user is not logged in
    if (!this.userData) {
      this.router.navigate(['/login'], { replaceUrl: true });
    }

    if (!this.userData.homeData) {
      this.userData.homeData = { usersJoined: 0, eventsHosted: 0, posts: [] };
      this.auth.updateCurrentUserHomeData(this.userData.homeData);
    }
  }

  // Handle image file selection
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      this.errorMsg = 'Only JPEG, PNG, or WEBP images are allowed.';
      this.resetImage();
      return;
    }

    // Validate file size
    if (file.size > 3 * 1024 * 1024) {
      this.errorMsg = 'Image must be smaller than 3MB.';
      this.resetImage();
      return;
    }

    // Clear errors and show image preview
    this.errorMsg = '';
    this.imageFile = file;

    const reader = new FileReader();
    reader.onload = e => this.imagePreview = (e.target as FileReader).result;
    reader.readAsDataURL(file);
  }

  // Reset image data and preview
  resetImage() {
    this.imageFile = null;
    this.imagePreview = null;
  }

  // Create and save new post
  createPost(event: Event) {
    event.preventDefault();
    this.errorMsg = '';

    // Validate text input
    const content = this.postContent.nativeElement.value.trim();
    if (!content) {
      this.errorMsg = 'Post content cannot be empty!';
      return;
    }

    // Ensure user is logged in
    if (!this.userData) {
      this.errorMsg = 'You must be logged in to post.';
      return;
    }

    // Create the new post
    const newPost = {
      content,
      image: this.imagePreview || null,
      createdAt: new Date(),
      name: this.userData.name || 'Anonymous',
      surname: this.userData.surname || ''
    };

    // Save post to user pprofile
    this.userData.homeData.posts.push(newPost);
    this.auth.updateCurrentUserHomeData(this.userData.homeData);

    // Clear input box
    this.postContent.nativeElement.value = '';
    this.resetImage();

    // Show success message and redirect to profile page
    alert('Post shared successfully 💖');
    this.router.navigate(['/'], { replaceUrl: true });
  }
}

