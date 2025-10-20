import { Component } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
  imports: [
    FormsModule,
    RouterModule,
    AngularFireAuthModule,     
    AngularFirestoreModule   
  ]
})
export class RegisterComponent {
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {}

  onRegister(name: string, surname: string, email: string, password: string) {
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(cred => {
        return this.firestore.collection('users').doc(cred.user?.uid).set({
          name,
          surname,
          email,
          createdAt: new Date()
        });
      })
      .then(() => this.router.navigate(['/profile'])) // redirect after signup
      .catch(err => alert(err.message));
  }
}
