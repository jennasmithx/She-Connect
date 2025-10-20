import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { environment } from '../../environments/environment'; // correct path

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  public auth;

  constructor() {
    // Initialize Firebase here inside the constructor
    const app = initializeApp(environment.firebase);
    this.auth = getAuth(app);
  }
}
