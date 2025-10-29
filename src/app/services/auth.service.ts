import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// ✅ User interface
export interface User {
  name: string;
  surname: string;
  email: string;
  password: string;
  homeData: {
    usersJoined: number;
    eventsHosted: number;
    posts: any[];
  };
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _currentUser = new BehaviorSubject<User | null>(this.getCurrentUser());
  currentUser$ = this._currentUser.asObservable();

  register(name: string, surname: string, email: string, password: string) {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some((u: User) => u.email === email)) throw new Error('Email already registered!');

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

  login(email: string, password: string) {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: User) => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this._currentUser.next(user);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this._currentUser.next(null);
  }

  getCurrentUser(): User | null {
    return JSON.parse(localStorage.getItem('currentUser') || 'null');
  }

  updateCurrentUserHomeData(homeData: User['homeData']) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return;

    currentUser.homeData = homeData;

    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const index = users.findIndex((u: User) => u.email === currentUser.email);
    users[index] = currentUser;

    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    this._currentUser.next(currentUser);
  }

  isLoggedIn() {
    return !!localStorage.getItem('currentUser');
  }

  addProfile(user: Partial<User> & { name: string; surname: string; email: string; password: string }) {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

    if (users.some((u: User) => u.email === user.email)) {
      throw new Error('Email already registered!');
    }

    // ✅ Force homeData to exist
    const newUser: User = {
      name: user.name,
      surname: user.surname,
      email: user.email,
      password: user.password,
      homeData: user.homeData || { usersJoined: 0, eventsHosted: 0, posts: [] }
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
  }
  
}
