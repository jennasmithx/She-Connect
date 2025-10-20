import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) {}

  // Sign up
  async signup(name: string, surname: string, email: string, password: string) {
    const cred = await this.afAuth.createUserWithEmailAndPassword(email, password);
    return this.firestore.collection('users').doc(cred.user?.uid).set({
      name,
      surname,
      email,
      createdAt: new Date()
    });
  }

  // Login
  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  // Logout
  logout() {
    return this.afAuth.signOut();
  }

  // Current user session
  getCurrentUser() {
    return this.afAuth.authState; // observable of logged-in user
  }
}
