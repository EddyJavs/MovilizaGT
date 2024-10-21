import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../services/general.service';
import { AppComponent } from '../app.component';
import * as moment from 'moment';

declare var google: any;

@Component({
  selector: 'app-conductor-trips',
  templateUrl: './conductor-trips.page.html',
  styleUrls: ['./conductor-trips.page.scss'],
})
export class ConductorTripsPage implements OnInit {
  trips: any[] = [];  // Array para almacenar los viajes del pasajero
  geocoder: any;  // Servicio de Geocoder de Google para obtener los nombres de los lugares
  notificationMessage: string = '';
  notificationType: 'success' | 'error' | 'warning' | 'info' = 'info';
  isNotificationVisible: boolean = false;
  selectedStatus: string = 'pendiente';

  constructor(private generalService: GeneralService, private appComponent: AppComponent) {
    this.geocoder = new google.maps.Geocoder();  // Inicializa el servicio de geocodificación de Google
  }

  ngOnInit() {
    const userData = sessionStorage.getItem('userData');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      const userId = parsedUserData.userId;
      
      // Cargar los viajes del usuario
      this.loadconductorTrips(userId);
    }
  }

  onStatusChange(event: any) {
    const userData = sessionStorage.getItem('userData');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      const userId = parsedUserData.userId;
      
      // Cargar los viajes según el estado seleccionado
      this.loadconductorTrips(userId, this.selectedStatus);
    }
  }

  // Función para cargar los viajes solicitados por el pasajero
  loadconductorTrips(userId: number, statusTrip: string = 'pendiente') {
    const params = {
      userIdCreator: userId,
      statusTrip: statusTrip  // Se puede ajustar este parámetro
    };

    this.generalService.get('api/tripsByRouteCreator', params).subscribe({
      next: (response: any) => {
        this.trips = response;

        // Para cada viaje, obtener el nombre de los puntos de inicio y fin
        this.trips.forEach((trip: any) => {
          this.getPlaceNameFromCoordinates(trip.startPoints.split(',')[0], trip.startPoints.split(',')[1], 'startLocation', trip);
          this.getPlaceNameFromCoordinates(trip.endPoints.split(',')[0], trip.endPoints.split(',')[1], 'endLocation', trip);
        });
      },
      error: (err) => {
        console.error('Error al cargar los viajes solicitados:', err);
      }
    });
  }

  // Función para obtener el nombre del lugar a partir de las coordenadas
  getPlaceNameFromCoordinates(lat: number, lng: number, key: 'startLocation' | 'endLocation', trip: any) {
    const latlng = { lat: parseFloat(lat + ''), lng: parseFloat(lng + '') };

    this.geocoder.geocode({ location: latlng }, (results: any, status: any) => {
      if (status === 'OK' && results[0]) {
        trip[key] = results[0].formatted_address;  // Asignar el nombre del lugar
      } else {
        console.error('Error al obtener el nombre del lugar:', status);
        trip[key] = `${lat}, ${lng}`;  // Si no se puede obtener el nombre, mostrar las coordenadas
      }
    });
  }
  
  // Método para mostrar una notificación
  showNotification(message: string, type: 'success' | 'error' | 'info' | 'warning'): void {
    this.notificationMessage = message;
    this.notificationType = type;
    this.isNotificationVisible = true;

    // Opción para cerrar automáticamente la notificación después de 6 segundos
    setTimeout(() => {
      this.isNotificationVisible = false;
    }, 6000);
  }

  

  // Verifica si el viaje ya fue completado para permitir la calificación
  isTripCompleted(trip: any): boolean {
    const tripEndDate = moment(trip.tripEnd);  // Fecha de fin del viaje
    const now = moment();  // Fecha actual
    return trip.statusTrip === 'aceptado' && tripEndDate.isBefore(now);
  }

  // Función para enviar la calificación al backend
  submitCalification(trip: any) {
    const userData = sessionStorage.getItem('userData');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      const userId1 = parsedUserData.userId;  // Usuario que califica
      const userId2 = trip.user.userId;  // Conductor (el calificado)

      const calificationData = {
        score: trip.calificationScore || 0,  // Calificación seleccionada (0 a 5)
        message: trip.calificationComment || '',  // Comentario opcional
        FK_userId1: userId1,  // ID del usuario que califica
        FK_userId2: userId2,  // ID del pasajero
        FK_tripId: trip.tripId  // ID del viaje
      };

      this.generalService.post('api/createQualification', calificationData).subscribe({
        next: (response) => {
          console.log('Calificación enviada exitosamente:', response);
          this.showNotification('Calificación enviada exitosamente', 'success');
          this.appComponent.showNotification('Calificación enviada exitosamente', 'success');
        },
        error: (error) => {
          console.error('Error al enviar la calificación:', error);
          this.showNotification('Error al enviar la calificación', 'error');
          this.appComponent.showNotification('Error al enviar la calificación', 'error');
        }
      });
    }
  }

  // Método para alternar los detalles del conductor
  toggleConductorDetails(trip: any) {
    trip.showConductorDetails = !trip.showConductorDetails;
  }

  // Función para aceptar un viaje con el precio acordado
  acceptTrip(trip: any) {
    const requestBody = {
      estado: '3',  // Estado "aceptado"
      precio: trip.agreedPrice,
      viajeId: trip.tripId
    };

    this.generalService.post('api/updateTripStatus', requestBody).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.showNotification(response.message, 'success');
          this.appComponent.showNotification(response.message, 'success');
          trip.statusTrip = 'aceptado';  // Actualiza el estado del viaje en el frontend
        }else{
          this.appComponent.showNotification(response.message, 'error');
        }
      },
      error: (err) => {
        console.error('Error al aceptar el viaje:', err);
        this.showNotification('Error al aceptar el viaje', 'error');
      }
    });
  }
}
