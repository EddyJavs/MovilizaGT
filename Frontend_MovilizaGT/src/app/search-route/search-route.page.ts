import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonInput, NavController } from '@ionic/angular';
import { GeneralService } from '../services/general.service';
import { ChangeDetectorRef } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-search-route',
  templateUrl: './search-route.page.html',
  styleUrls: ['./search-route.page.scss'],
})
export class SearchRoutePage implements AfterViewInit {
  searchForm: FormGroup;
  notificationMessage: string = '';  // Mensaje de notificación
  notificationType: 'success' | 'error' | 'info' | 'warning' = 'info';  // Tipo de notificación
  isNotificationVisible: boolean = false;  // Visibilidad de la notificación
  private map: any;
  private originMarker: any;
  private destinationMarker: any;
  private directionsService: any;
  private directionsRenderer: any;
  showMap: boolean = false;  // Controla la visibilidad del mapa

  @ViewChild('originInput', { static: false }) originInput!: IonInput;
  @ViewChild('destinationInput', { static: false }) destinationInput!: IonInput;

  constructor(private fb: FormBuilder, private generalService: GeneralService, private cd: ChangeDetectorRef, private navCtrl: NavController) {
    // Inicializa el formulario
    this.searchForm = this.fb.group({
      startLocation: ['', Validators.required],  // Punto de inicio
      endLocation: ['', Validators.required],    // Punto de destino
      startDate: ['', Validators.required],      // Fecha de la búsqueda
      startTime: ['', Validators.required],      // Hora de la búsqueda
    });

    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
  }

  ngAfterViewInit(): void {
    this.initAutocomplete();
  }

  // Inicializa el mapa cuando ambos puntos han sido seleccionados
  initMap(): void {
    const mapContainer = document.getElementById('map');
    if (mapContainer) {
      this.map = new google.maps.Map(mapContainer as HTMLElement, {
        center: { lat: 14.634915, lng: -90.506882 },
        zoom: 12,
      });
      this.directionsRenderer.setMap(this.map);
    } else {
      console.error('El contenedor del mapa no existe en el DOM');
    }
  }

  // Inicializa el autocompletado de Google Places para los inputs de origen y destino
  async initAutocomplete() {
    const originInputElement = await this.originInput.getInputElement();
    const destinationInputElement = await this.destinationInput.getInputElement();

    this.setupAutocomplete(originInputElement, 'origin');
    this.setupAutocomplete(destinationInputElement, 'destination');
  }

  setupAutocomplete(inputElement: HTMLInputElement, type: 'origin' | 'destination'): void {
    const autocomplete = new google.maps.places.Autocomplete(inputElement, {
      componentRestrictions: { country: 'GT' },  // Restringir a Guatemala
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.geometry || !place.geometry.location) {
        return;
      }

      if (type === 'origin') {
        this.setMarker('origin', place.geometry.location);
        this.searchForm.patchValue({ startLocation: place.formatted_address });
      } else if (type === 'destination') {
        this.setMarker('destination', place.geometry.location);
        this.searchForm.patchValue({ endLocation: place.formatted_address });
      }

      // Si ambos puntos están seleccionados, muestra el mapa y traza la ruta
      if (this.originMarker && this.destinationMarker) {
        this.showMap = true;
        this.cd.detectChanges();  // Detecta cambios para renderizar el mapa
        this.initMap();  // Solo inicializa el mapa una vez que se detecten los cambios
        this.traceRoute();
      }
    });
  }

  // Función para establecer los marcadores en el mapa
  setMarker(type: 'origin' | 'destination', location: any): void {
    if (type === 'origin') {
      if (this.originMarker) {
        this.originMarker.setPosition(location);
      } else {
        this.originMarker = new google.maps.Marker({
          position: location,
          map: this.map,
          title: 'Origen',
        });
      }
    } else if (type === 'destination') {
      if (this.destinationMarker) {
        this.destinationMarker.setPosition(location);
      } else {
        this.destinationMarker = new google.maps.Marker({
          position: location,
          map: this.map,
          title: 'Destino',
        });
      }
    }
  }

  // Función para trazar la ruta entre los puntos seleccionados
  traceRoute(): void {
    const origin = this.originMarker.getPosition();
    const destination = this.destinationMarker.getPosition();

    const request = {
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING,
    };

    this.directionsService.route(request, (result: any, status: any) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsRenderer.setDirections(result);
      } else {
        this.showNotification('Error al trazar la ruta', 'error');
      }
    });
  }

  // Método para mostrar una notificación
  showNotification(message: string, type: 'success' | 'error' | 'info' | 'warning') {
    console.log('Notificación:', message, type);  // Verifica si el método se está ejecutando
    this.notificationMessage = message;
    this.notificationType = type;
    this.isNotificationVisible = true;

    // Ocultar la notificación después de unos segundos (opcional)
    setTimeout(() => {
      this.notificationMessage = '';
    }, 3000);  // Ocultar después de 3 segundos
  }

  // Método para manejar la búsqueda de rutas
  onSearchRoute() {
    if (this.searchForm.valid) {
      const startLocation = this.searchForm.get('startLocation')?.value;
      const endLocation = this.searchForm.get('endLocation')?.value;
      const startDate = this.searchForm.get('startDate')?.value;
      const startTime = this.searchForm.get('startTime')?.value;
  
      // Consulta al backend con las coordenadas de origen y destino y los demás parámetros
      const params = {
        latitudInicio: this.originMarker.getPosition().lat(),
        longitudInicio: this.originMarker.getPosition().lng(),
        latitudDestino: this.destinationMarker.getPosition().lat(),
        longitudDestino: this.destinationMarker.getPosition().lng(),
        fechaViaje: startDate,
        horaViaje: startTime + ':00',  // Formato HH:mm:ss
      };
      console.log('Parámetros de búsqueda:', params);
  
      // Realizamos la petición GET al servicio general
      this.generalService.get('api/searchRoutes', params).subscribe({
        next: (response: any) => {
          console.log('Rutas encontradas:', response);
          if (response.length > 0) {
            // Redirigir a la página de resultados si se encontraron rutas
            this.navCtrl.navigateForward('/search-results', {
              queryParams: {
                routes: JSON.stringify(response),  // Pasar las rutas como parámetro
              }
            });
          } else {
            console.log('No se encontraron rutas');
            this.showNotification('No se encontraron rutas', 'warning');
            
          }
        },
        error: (err) => {
          console.error('Error al buscar rutas', err);
          this.showNotification('Error al buscar rutas', 'error');
        }
      });
    } else {
      this.showNotification('Por favor, complete todos los campos', 'error');
    }
  }

  
}
