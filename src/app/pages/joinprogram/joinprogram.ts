import { Component } from '@angular/core';

@Component({
  selector: 'app-joinprogram',
  imports: [],
  templateUrl: './joinprogram.html',
  styleUrl: './joinprogram.css'
})
export class JoinprogramComponent {
  openArticle(url: string) {
  window.open(url, '_blank');
}
}
