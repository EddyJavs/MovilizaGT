import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {
  constructor(private navCtrl: NavController, private route: ActivatedRoute, private appComponent: AppComponent) {
    this.notificationMessage = '';  // Inicializa el mensaje de notificación
    this.notificationType = 'info';  // Inicializa el tipo de not
    this.isNotificationVisible = false;  // Inicializa la visibilidad de la notificación
    
  }

  ngOnInit() {
    this.notificationMessage = '';  // Inicializa el mensaje de notificación
    this.notificationType = 'info';  // Inicializa el tipo de not
    this.isNotificationVisible = false;  // Inicializa la visibilidad de la notificación
    this.appComponent.showNotification('Correcto', 'success');
  }

  goToCreateRoute() {
    this.navCtrl.navigateForward('/create-route'); // Navega a la página para crear una nueva ruta
  }

  goToSearchRoute() {
    this.navCtrl.navigateForward('/search-route'); // Navega a la página para buscar rutas
  }

  goToConductorTrips() {
    this.navCtrl.navigateForward('/requested-trips'); // Navega a la página para ver viajes anteriores
  }

  goToProfile() {
    this.navCtrl.navigateForward('/profile'); // Navega a la página para completar el perfil
  }

  goToRateTrip() {
    this.navCtrl.navigateForward('/rate-trip'); // Navega a la página para calificar un viaje
  }

  notificationMessage: string = '';
  notificationType: 'success' | 'error' | 'warning' | 'info' = 'info';
  isNotificationVisible: boolean = false;  // Agrega esta propiedad

  showNotification(message: string, type: 'success' | 'error' | 'info' | 'warning'): void {
    this.notificationMessage = message;
    this.notificationType = type;
    this.isNotificationVisible = true;

    // Opción para cerrar automáticamente la notificación después de 3 segundos
    setTimeout(() => {
      this.isNotificationVisible = false;
    }, 6000);  // 3 segundos
  }
}
