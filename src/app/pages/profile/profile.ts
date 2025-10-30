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
  avatarFile: File | null = null;
  avatarPreview: string | ArrayBuffer | null = null;
  errorMsg = '';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    const user = this.auth.getCurrentUser();
    if (!user) {
      this.router.navigate(['/login'], { replaceUrl: true });
      return;
    }
    this.userData = user;

    if (!this.userData.homeData) {
      this.userData.homeData = { usersJoined: 0, eventsHosted: 0, posts: [] };
      this.auth.updateCurrentUserHomeData(this.userData.homeData);
    }

    this.auth.currentUser$.subscribe(u => {
      if (u && u.homeData) {
        this.posts = u.homeData.posts;
        this.userData = u;
      }
    });
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

  createPost(event: Event) {
    event.preventDefault();
    const content = this.postContent.nativeElement.value.trim();
    if (!content) { alert('Post content cannot be empty!'); return; }

    const newPost = {
      content,
      image: this.imagePreview || null,
      createdAt: new Date(),
      name: this.userData.name || 'Anonymous',
      surname: this.userData.surname || ''
    };

    this.userData.homeData.posts.push(newPost);
    this.auth.updateCurrentUserHomeData(this.userData.homeData);

    this.postContent.nativeElement.value = '';
    this.resetImage();
  }

  saveBio(bio: string) {
    bio = bio.trim();
    if (!bio) { alert("Bio can't be empty"); return; }

    this.userData.bio = bio;
    this.updateUserLocalStorage('bio', bio);
    alert("Bio updated ✅");
  }

  saveLocation(location: string) {
    location = location.trim();
    if (!location) { alert("Location can't be empty"); return; }

    this.userData.location = location;
    this.updateUserLocalStorage('location', location);
    alert("Location updated ✅");
  }

  onAvatarSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!validTypes.includes(file.type)) { alert('Only JPEG, PNG, or WEBP allowed.'); return; }
    if (file.size > 3 * 1024 * 1024) { alert('Image must be smaller than 3MB.'); return; }

    this.avatarFile = file;
    const reader = new FileReader();
    reader.onload = e => (this.avatarPreview = (e.target as FileReader).result);
    reader.readAsDataURL(file);
  }

  saveAvatar() {
    if (!this.avatarPreview) { alert("Select a photo first!"); return; }

    this.userData.avatar = this.avatarPreview;
    this.updateUserLocalStorage('avatar', this.avatarPreview);
    alert('Profile photo updated ✅');
  }

  private updateUserLocalStorage(key: string, value: any) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const idx = users.findIndex((u: any) => u.email === this.userData.email);
    if (idx !== -1) { users[idx][key] = value; localStorage.setItem('users', JSON.stringify(users)); }
    localStorage.setItem('currentUser', JSON.stringify(this.userData));
  }
}
