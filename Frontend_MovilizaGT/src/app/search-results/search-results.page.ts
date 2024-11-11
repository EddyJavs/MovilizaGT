import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeneralService } from '../services/general.service';  // Asegúrate de tener el servicio importado
import { NavController } from '@ionic/angular';
import * as moment from 'moment';
import { AppComponent } from '../app.component';

declare var google: any;

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.page.html',
  styleUrls: ['./search-results.page.scss'],
})
export class SearchResultsPage implements OnInit, AfterViewInit {
  routes: any[] = [];  // Array para almacenar las rutas encontradas
  geocoder: any;  // Para usar el servicio de Geocoding de Google
  maps: any[] = [];  // Lista para almacenar las referencias de los mapas
  directionsServices: any[] = [];  // Lista para almacenar los servicios de direcciones
  directionsRenderers: any[] = [];  // Lista para almacenar los renderizadores de direcciones
  userId: number | null = null;  // ID del usuario autenticado

  constructor(
    private route: ActivatedRoute,
    private generalService: GeneralService,
    private navCtrl: NavController,  // Para manejar la navegación,
    private appComponent: AppComponent
  ) {
    this.geocoder = new google.maps.Geocoder();  // Inicializa el geocoder de Google Maps
  }

  ngOnInit() {
    console.log('Buscando rutas...');
    const userData = sessionStorage.getItem('userData');
    console.log('Datos del usuario:', userData);
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      this.userId = parsedUserData.userId;
      console.log('User ID:', this.userId);
    }
    // Obtener los parámetros con las rutas
    this.route.queryParams.subscribe(params => {
      if (params['routes']) {
        this.routes = JSON.parse(params['routes']);

        // Para cada ruta, obtener el nombre del lugar desde las coordenadas
        this.routes.forEach((route: any) => {
          this.getPlaceNameFromCoordinates(route.latitudeStartPoint, route.longitudeStartPoint, 'startLocation', route);
          this.getPlaceNameFromCoordinates(route.latitudeEndPoint, route.longitudeEndPoint, 'endLocation', route);

          //hacer peticion para obtener calificacion basado en el id de la ruta.
          console.log('OBTENIENDO CALIFICACION');
          this.generalService.get('api/qualifications/route', {routeId : route.routeId}).subscribe({
            next: (response: any) => {
              console.log('calificacion encontrada:', response);
              route.calificacion = response.averageScore;
            },
            error: (err) => {
              route.calificacion = 0;
              console.log('Error al obtener calificacion de la ruta ' + route);
            }
          });

        });



      }
    });
  }

  ngAfterViewInit() {
    // Después de que el componente se haya inicializado, renderizamos los mapas y las rutas
    setTimeout(() => {
      this.routes.forEach((route, index) => {
        this.initMap(index, route.latitudeStartPoint, route.longitudeStartPoint, route.latitudeEndPoint, route.longitudeEndPoint);
      });
    }, 500);  // Usamos un pequeño retardo para asegurarnos de que el DOM se haya cargado
  }

  // Función para inicializar el mapa para cada tarjeta
  initMap(index: number, latStart: number, lngStart: number, latEnd: number, lngEnd: number): void {
    const mapElement = document.getElementById(`map-${index}`);
    if (mapElement) {
      const map = new google.maps.Map(mapElement as HTMLElement, {
        center: { lat: latStart, lng: lngStart },
        zoom: 12,
      });

      // Creamos el servicio de direcciones y el renderizador para cada ruta
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer();

      directionsRenderer.setMap(map);

      const request = {
        origin: { lat: latStart, lng: lngStart },
        destination: { lat: latEnd, lng: lngEnd },
        travelMode: google.maps.TravelMode.DRIVING,
      };

      directionsService.route(request, (result: any, status: any) => {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsRenderer.setDirections(result);
        } else {
          console.error('Error al trazar la ruta:', status);
        }
      });

      // Guardamos las referencias
      this.maps[index] = map;
      this.directionsServices[index] = directionsService;
      this.directionsRenderers[index] = directionsRenderer;
    }
  }

  // Función para obtener el nombre del lugar a partir de las coordenadas
  getPlaceNameFromCoordinates(lat: number, lng: number, key: 'startLocation' | 'endLocation', route: any) {
    const latlng = { lat: parseFloat(lat + ''), lng: parseFloat(lng + '') };

    this.geocoder.geocode({ location: latlng }, (results: any, status: any) => {
      if (status === 'OK' && results[0]) {
        route[key] = results[0].formatted_address;  // Asignar el nombre del lugar
      } else {
        console.error('Error al obtener el nombre del lugar:', status);
        route[key] = `${lat}, ${lng}`;  // Si no se puede obtener el nombre, mostrar las coordenadas
      }
    });
  }

  // Función para validar la entrada de los asientos
  validateSeats(route: any) {
    route.isValidSeats = route.neededSeats && route.neededSeats > 0 && route.neededSeats <= route.availableSeats;
  }
  // Función para solicitar un viaje
  requestTrip(route: any) {
    console.log('Solicitando viaje:', route);
    console.log('Usuario autenticado:', this.userId);
    const tripData = {
      startPoints: `${route.latitudeStartPoint}, ${route.longitudeStartPoint}`,
      endPoints: `${route.latitudeEndPoint}, ${route.longitudeEndPoint}`,
      neededSeats: route.neededSeats,  // Asientos necesarios

      // Formatear las fechas usando moment.js
      tripStart: moment().format('YYYY-MM-DDTHH:mm:ss'),  // Formato: YYYY-MM-DDTHH:mm:ss
      tripEnd: moment().add(30, 'minutes').format('YYYY-MM-DDTHH:mm:ss'),  // Sumar 30 minutos

      FK_userId: this.userId,  // ID del usuario autenticado
      FK_routeId: route.routeId  // ID de la ruta seleccionada
    };

    this.generalService.post('api/createTrip', tripData).subscribe({
      next: (response: any) => {
        if (response.success) {
          console.log('Viaje solicitado exitosamente', response);
          this.appComponent.showNotification('Correcto', 'success');
          // Puedes redirigir al usuario o mostrar una notificación de éxito
          this.navCtrl.navigateRoot('/inicio', {
            queryParams: {
              notificationMessage: 'Viaje Solicitado Exitosamente, El conductor será notificado y se pondrá en contacto contigo.',
              notificationType: 'success'
            }
          });
        } else {
          console.error('Error al solicitar el viaje', response);
          this.showNotification('Error al solicitar el viaje', 'error');
        }

      },
      error: (err) => {
        console.error('Error al solicitar el viaje', err);
        // Mostrar mensaje de error
      }
    });
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
