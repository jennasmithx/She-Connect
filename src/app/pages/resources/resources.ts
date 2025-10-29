import { Component } from '@angular/core';

@Component({
  selector: 'app-resources',
  imports: [],
  templateUrl: './resources.html',
  styleUrl: './resources.css'
})

export class ResourcesComponent {
  openArticle(url: string) {
    window.open(url, '_blank');
}
}
