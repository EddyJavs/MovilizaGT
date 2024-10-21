import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  notificationMessage: string = '';
  notificationType: 'success' | 'error' | 'info' | 'warning' = 'info';
  isNotificationVisible: boolean = false;

  constructor() {}

  // Método para mostrar una notificación global
  showNotification(message: string, type: 'success' | 'error' | 'info' | 'warning') {
    this.notificationMessage = message;
    this.notificationType = type;
    this.isNotificationVisible = true;
  }

  // Método para cerrar la notificación desde cualquier parte de la app
  closeNotification() {
    this.isNotificationVisible = false;
  }
}
