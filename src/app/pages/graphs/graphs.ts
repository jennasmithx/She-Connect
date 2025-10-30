import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-graphs',
  template: `<canvas id="usersChart" width="400" height="200"></canvas>
             <canvas id="eventsChart" width="400" height="200" class="mt-4"></canvas>
             <canvas id="postsChart" width="400" height="200" class="mt-4"></canvas>`,
  styles: [`
    canvas {
      max-width: 600px;
      margin: 0 auto;
      display: block;
    }
  `]
})
export class GraphsComponent implements OnInit {

  ngOnInit(): void {
    const usersJoined = [2, 4, 6, 8, 10]; // example data
    const eventsHosted = [1, 2, 1, 3, 2];
    const postsCreated = [0, 1, 2, 1, 3];
    const labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'];

    // Users Joined Chart
    new Chart('usersChart', {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Users Joined',
          data: usersJoined,
          backgroundColor: 'rgba(99, 132, 255, 0.2)',
          borderColor: 'rgba(99, 132, 255, 1)',
          borderWidth: 2,
          fill: true
        }]
      }
    });

    // Events Hosted Chart
    new Chart('eventsChart', {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Events Hosted',
          data: eventsHosted,
          backgroundColor: 'rgba(255, 99, 132, 0.6)'
        }]
      }
    });

    // Posts Created Chart
    new Chart('postsChart', {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Posts Created',
          data: postsCreated,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderWidth: 2,
          fill: true
        }]
      }
    });
  }
}
