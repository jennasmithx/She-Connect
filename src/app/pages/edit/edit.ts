// src/app/pages/edit-profile/edit-profile.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './edit.html',
  styleUrls: ['./edit.css']
})
export class EditComponent {
  name: string = '';
  surname: string = '';
  email: string = '';

  uid: string = '';

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.uid = user.uid;
        this.firestore.collection('users').doc(user.uid).valueChanges().subscribe((data: any) => {
          this.name = data.name;
          this.surname = data.surname;
          this.email = data.email;
        });
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  saveChanges() {
    this.firestore.collection('users').doc(this.uid).update({
      name: this.name,
      surname: this.surname,
      email: this.email
    }).then(() => alert('Profile updated!'))
      .catch(err => alert(err.message));
  }
}
