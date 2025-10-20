import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [FormsModule, RouterModule] // ✅ standalone imports
})
export class LoginComponent {

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  onLogin(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['/profile']); // redirect on success
      })
      .catch(err => alert(err.message));
  }
}
