import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../services/general.service'; // Asume que ya tienes un servicio para manejar el usuario logueado
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-requested-trips',
  templateUrl: './requested-trips.page.html',
  styleUrls: ['./requested-trips.page.scss'],
})
export class RequestedTripsPage implements OnInit {
  trips: any[] = [];  // Almacena los viajes solicitados
  statusTrip: string = 'pendiente';  // Estado del viaje por defecto
  userId: number | null = null;  // ID del usuario autenticado

  constructor(private generalService: GeneralService,
    private appComponent: AppComponent
  ) { }

  ngOnInit() {
    const userData = sessionStorage.getItem('userData');
    console.log('Datos del usuario:', userData);
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      this.userId = parsedUserData.userId;
      console.log('User ID:', this.userId);
    }
    this.loadTrips();
  }

  // Función para cargar los viajes solicitados
  loadTrips() {
    // Verificar si el userId es nulo antes de hacer la solicitud
    if (this.userId !== null) {
      const params = {
        userIdCreator: this.userId,  // Asegurarte de que no sea null aquí
        statusTrip: this.statusTrip
      };

      this.generalService.get('api/tripsByRouteCreator', params).subscribe({
        next: (response: any) => {
          this.trips = response;
          this.appComponent.showNotification('Viajes Cargados correctamente', 'success');
        },
        error: (err) => {
          console.error('Error al cargar los viajes:', err);
          this.appComponent.showNotification('Error al cargar los viajes:', 'error');
        }
      });
    } else {
      console.error('Error: El usuario no está autenticado');
      this.appComponent.showNotification('Error: El usuario no está autenticado', 'error');
      // Aquí podrías redirigir al usuario al login o mostrar un mensaje
    }
  }

  // Función para ejecutar al cambiar el estado del filtro
  onStatusChange() {
    this.loadTrips();  // Recargar los viajes cuando se cambie el filtro
  }
}
