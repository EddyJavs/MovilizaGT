import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {
  constructor(private navCtrl: NavController, private route: ActivatedRoute) {}

  ngOnInit() {
    // Verificar si hay parámetros de notificación
    this.route.queryParams.subscribe(params => {
      if (params['notificationMessage']) {
        this.notificationMessage = params['notificationMessage'];
        this.notificationType = params['notificationType'];
        this.isNotificationVisible = true;

        // Ocultar la notificación después de 3 segundos
        setTimeout(() => {
          this.isNotificationVisible = false;
        }, 3000);
      }
    });
  }

  goToCreateRoute() {
    this.navCtrl.navigateForward('/create-route'); // Navega a la página para crear una nueva ruta
  }

  goToSearchRoute() {
    this.navCtrl.navigateForward('/search-route'); // Navega a la página para buscar rutas
  }

  goToPreviousTrips() {
    this.navCtrl.navigateForward('/previous-trips'); // Navega a la página para ver viajes anteriores
  }

  goToProfile() {
    this.navCtrl.navigateForward('/profile'); // Navega a la página para completar el perfil
  }

  goToRateTrip() {
    this.navCtrl.navigateForward('/rate-trip'); // Navega a la página para calificar un viaje
  }

  notificationMessage: string = '';
  notificationType: 'success' | 'error' | 'warning' | 'info'='info' ;
  isNotificationVisible: boolean = false;  // Agrega esta propiedad

  showNotification(message: string, type: 'success' | 'error' | 'info' | 'warning'): void {
    this.notificationMessage = message;
    this.notificationType = type;
    this.isNotificationVisible = true;
  
    // Opción para cerrar automáticamente la notificación después de 3 segundos
    setTimeout(() => {
      this.isNotificationVisible = false;
    }, 3000);  // 3 segundos
  }
}
