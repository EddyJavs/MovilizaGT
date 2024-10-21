import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnChanges {
  // Input properties to accept data from the parent component
  @Input() message: string = '';  // Message to display
  @Input() type: 'success' | 'error' | 'warning' | 'info' = 'info';  // Type of notification
  @Input() isVisible: boolean = false;  // Controls visibility of the notification

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['message']) {
      console.log('Notification message changed:', this.message);
    }
    if (changes['isVisible']) {
      console.log('Notification visibility changed:', this.isVisible);
    }
    if (changes['type']) {
      console.log('Notification type changed:', this.type);
    }
  }

  // Method to close the notification
  closeNotification(): void {
    this.isVisible = false;  // Oculta la notificación cuando el usuario presiona "Aceptar"
  }
}
