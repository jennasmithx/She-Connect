import { Component } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.html',
  styleUrls: ['./report.css']
})
export class ReportComponent {
  // Send alert
  sendReport(message: string) {
    if (!message.trim()) {
      alert('Please enter a message before sending.');
      return;
    }

    alert('✅ Report sent: ' + message);
  }
}
