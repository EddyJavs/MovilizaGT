import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {
  constructor(private navCtrl: NavController) {}

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
}
