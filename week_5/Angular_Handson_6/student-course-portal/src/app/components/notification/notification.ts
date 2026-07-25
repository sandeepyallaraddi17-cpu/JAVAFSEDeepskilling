import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],

  // Providing NotificationService here creates a separate service
  // instance scoped to this component and its child components.
  providers: [NotificationService],

  templateUrl: './notification.html',
  styleUrl: './notification.css'
})
export class NotificationComponent {

  constructor(
    public notificationService: NotificationService
  ) {}

  addNotification(): void {
    this.notificationService.add(
      'Notification added successfully.'
    );
  }
}