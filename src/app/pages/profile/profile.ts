import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../component/header/header';

@Component({
  selector: 'app-profile',
  standalone: true,  
  imports: [CommonModule, RouterModule, HeaderComponent],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class ProfileComponent {
  userData: any;

  constructor(
  private afAuth: AngularFireAuth,
  private firestore: AngularFirestore,
  private router: Router
) {
  this.afAuth.authState.subscribe(user => {
    if (user) {
      this.firestore.collection('users').doc(user.uid).valueChanges().subscribe(data => {
        this.userData = data;
      });
    } else {
      this.router.navigate(['/login']);
    }
  });
}


  // Logout method
  logout() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
