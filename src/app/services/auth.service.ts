import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Define what a User object looks like
export interface User {
  name: string;
  surname: string;
  email: string;
  password: string;
  parentEmail?: string; 
  homeData: {
    usersJoined: number;
    eventsHosted: number;
    posts: any[];
  };
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Store and observe the current logged-in user
  private _currentUser = new BehaviorSubject<User | null>(this.getCurrentUser());
  currentUser$ = this._currentUser.asObservable();

  // Register a new user and save to localStorage
  register(name: string, surname: string, email: string, password: string) {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some(u => u.email === email)) throw new Error('Email already registered!');

    const newUser: User = {
      name,
      surname,
      email,
      password,
      homeData: { usersJoined: 0, eventsHosted: 0, posts: [] }
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
  }

  // Log in an existing user
  login(email: string, password: string) {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this._currentUser.next(user);
      return true;
    }
    return false;
  }

  // Log out
  logout() {
    localStorage.removeItem('currentUser');
    this._currentUser.next(null);
  }

  // Get the current user
  getCurrentUser(): User | null {
    return JSON.parse(localStorage.getItem('currentUser') || 'null');
  }

  // Update user's home data and sync
  updateCurrentUserHomeData(homeData: User['homeData']) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return;

    currentUser.homeData = homeData;

    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const index = users.findIndex(u => u.email === currentUser.email);
    users[index] = currentUser;

    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    this._currentUser.next(currentUser);
  }

  // Check if a user is currently logged in
  isLoggedIn() {
    return !!localStorage.getItem('currentUser');
  }

  // Add a profile manually
  addProfile(user: Partial<User> & { name: string; surname: string; email: string; password: string; parentEmail?: string }) {
  const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
  if (users.some(u => u.email === user.email)) throw new Error('Email already registered!');

  const newUser: User = {
    name: user.name,
    surname: user.surname,
    email: user.email,
    password: user.password,
    parentEmail: user.parentEmail,
    homeData: user.homeData || { usersJoined: 0, eventsHosted: 0, posts: [] }
  };

  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
}
}
