import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavComponent } from './component/nav/nav';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, NavComponent, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  protected readonly title = signal('she-connect');
}
