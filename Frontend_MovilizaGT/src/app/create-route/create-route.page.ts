import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonInput } from '@ionic/angular';
import { IonDatetime } from '@ionic/angular';
import { GeneralService } from '../services/general.service';  // Asegúrate de importar el servicio
import { NavController } from '@ionic/angular';

declare var google: any;


@Component({
  selector: 'app-create-route',
  templateUrl: './create-route.page.html',
  styleUrls: ['./create-route.page.scss'],
})
export class CreateRoutePage implements AfterViewInit, OnInit {
  userId: number | null = null;
  routeForm: FormGroup;
  private map: any;
  private markers: any[] = [];  // Lista de marcadores (puntos intermedios)
  private directionsService: any;
  private directionsRenderer: any;
  private waypoints: any[] = [];  // Lista de puntos intermedios
  private correlativeCounter: number = 1;  // Contador de paradas para correlativo

  @ViewChild('waypointInput', { static: false }) waypointInput!: IonInput;
  selectedDate: string | null = null;
  isDatePickerOpen = false;

  constructor(private fb: FormBuilder, private generalService: GeneralService, private navCtrl: NavController) {
    this.routeForm = this.fb.group({
      startTime: ['', Validators.required],
      startDate: ['', Validators.required],
      availableSeats: ['', [Validators.required, Validators.min(1)]],
      waypoint: [''],  // Campo para el punto de parada
    });

    // Inicializamos el servicio y el renderer de direcciones
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.initAutocomplete();
    this.directionsRenderer.setMap(this.map);
  }

  ngOnInit() {
    const userData = sessionStorage.getItem('userData');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      this.userId = parsedUserData.userId;
      console.log('User ID:', this.userId);
    }
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

  openDatePicker() {
    this.isDatePickerOpen = true; // Abre el modal con el calendario
  }

  closeDatePicker() {
    this.isDatePickerOpen = false; // Cierra el modal
  }

  onDateSelected(event: any) {
    this.selectedDate = event.detail.value;  // Captura la fecha seleccionada
    this.routeForm.patchValue({ startDate: this.selectedDate });  // Actualiza el formulario con la fecha seleccionada
    this.closeDatePicker();  // Cierra el calendario después de seleccionar una fecha
  }

  // Inicialización del mapa
  initMap(): void {
    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center: { lat: 14.634915, lng: -90.506882 },
      zoom: 12,
    });
  }

  // Inicialización del autocompletado para el campo de punto de parada
  async initAutocomplete() {
    const waypointInputElement = await this.waypointInput.getInputElement();
    this.setupAutocomplete(waypointInputElement);
  }

  // Configuración del autocompletado
  setupAutocomplete(inputElement: HTMLInputElement): void {
    const autocomplete = new google.maps.places.Autocomplete(inputElement, {
      componentRestrictions: { country: 'GT' },  // Restringimos la búsqueda a Guatemala
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.geometry || !place.geometry.location) {
        return;
      }

      // Centrar el mapa en el lugar seleccionado
      this.map.setCenter(place.geometry.location);
      this.map.setZoom(15);

      // Crear marcador para el lugar seleccionado
      const marker = new google.maps.Marker({
        position: place.geometry.location,
        map: this.map,
        title: 'Punto Intermedio',
      });

      // Agregar el marcador a la lista de puntos intermedios
      this.markers.push({
        marker: marker,
        location: place.geometry.location,
        correlative: this.correlativeCounter++,  // Incrementar el correlativo
      });

      // Limpiar el campo de texto después de seleccionar el lugar
      this.routeForm.patchValue({ waypoint: '' });
      inputElement.value = '';

      // Trazar la ruta después de agregar un nuevo punto
      this.traceRoute();
    });
  }

  // Función para trazar la ruta con los puntos ingresados
  traceRoute(): void {
    if (this.markers.length < 2) {
      this.showNotification('Por favor ingrese al menos dos puntos para trazar una ruta.', 'warning');
      return;
    }

    // Tomamos el primer punto como origen y el último como destino
    const origin = this.markers[0].location;
    const destination = this.markers[this.markers.length - 1].location;

    // El resto de los puntos serán waypoints
    const waypoints = this.markers.slice(1, -1).map(markerObj => ({
      location: markerObj.location,
      stopover: true,
    }));

    const request = {
      origin: origin,
      destination: destination,
      waypoints: waypoints,
      travelMode: google.maps.TravelMode.DRIVING,
    };

    this.directionsService.route(request, (result: any, status: any) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsRenderer.setDirections(result);
        this.calculateArrivalTimes(result.routes[0].legs);  // Calcular las horas de llegada
      } else {
        console.error('Error al trazar la ruta:', status);
      }
    });
  }

  // Función para calcular las horas de llegada a cada punto basado en la hora de inicio y la duración estimada
  calculateArrivalTimes(legs: any[]): void {
    const startTime = this.routeForm.get('startTime')?.value;
    const startDate = this.routeForm.get('startDate')?.value;

    if (!startTime || !startDate) {
      alert('Por favor, ingrese una hora y fecha de inicio');
      return;
    }

    // Crear un objeto Date con la fecha y hora seleccionadas.
    const formattedDate = new Date(startDate).toISOString().split('T')[0]; // YYYY-MM-DD
    let currentTime = new Date(`${formattedDate}T${startTime}`);

    // Si el primer leg es el origen, usamos la hora inicial como hora de salida
    this.markers[0].departureTime = this.formatTime(currentTime);  // El primer punto tendrá la hora de inicio

    legs.forEach((leg: any, index: number) => {
      if (index > 0) { // Ignoramos el primer punto, ya que ya tiene la hora de inicio
        const duration = leg.duration.value; // Duración en segundos
        currentTime = new Date(currentTime.getTime() + duration * 1000); // Añadir la duración al tiempo actual

        // Guardar la hora de llegada en el formato HH:mm:ss
        this.markers[index].departureTime = this.formatTime(currentTime);
      }
      console.log(`Hora de llegada al punto ${index + 1}: ${this.markers[index].departureTime}`);
    });
    // Para asegurarnos de que el último punto también se calcule correctamente
    const lastLegDuration = legs[legs.length - 1].duration.value; // Duración del último tramo en segundos
    currentTime = new Date(currentTime.getTime() + lastLegDuration * 1000);
    this.markers[this.markers.length - 1].departureTime = this.formatTime(currentTime);
    console.log(`Hora de llegada al último punto: ${this.markers[this.markers.length - 1].departureTime}`);

  }

  // Función para formatear la hora en formato HH:mm:ss
  formatTime(time: Date): string {
    return time.toTimeString().split(' ')[0];  // HH:mm:ss
  }

  // Función para limpiar el mapa
  clearMap(): void {
    this.markers.forEach(markerObj => markerObj.marker.setMap(null));  // Eliminar los marcadores del mapa
    this.markers = [];
    this.directionsRenderer.set('directions', null);  // Limpiar la ruta trazada
  }

  // Función para crear la ruta y enviarla al backend
  onCreateRoute(): void {
    if (this.routeForm.valid && this.markers.length >= 2) {
      const startTime = this.routeForm.get('startTime')?.value;
      const startDate = this.routeForm.get('startDate')?.value;

      // Formatear la hora y la fecha
      const formattedTime = startTime ? startTime + ':00' : '';  // Asegurar el formato HH:mm:ss
      const formattedDate = new Date(startDate).toISOString().split('T')[0];  // Asegurar el formato yyyy-mm-dd

      console.log(this.markers);
      console.log('USER ID', this.userId);
      const routeData = {
        departureTime: formattedTime,
        departureDate: formattedDate,
        availableSeats: this.routeForm.get('availableSeats')?.value,
        FK_userId: this.userId,  // Debes cambiar este valor según el usuario autenticado
        stands: this.markers.map((markerObj, index) => ({
          latitude: markerObj.location.lat(),
          longitude: markerObj.location.lng(),
          correlative: markerObj.correlative,
          departureTime: markerObj.departureTime,  // Ya en el formato HH:mm:ss
        })),
      };

      // Enviar la solicitud al backend utilizando el servicio general
      this.generalService.post('api/createRoute', routeData).subscribe({
        next: (response) => {
          this.showNotification('Ruta creada con exito', 'success');

          console.log('Ruta creada exitosamente', response);
          this.clearMap();  // Limpiar el mapa después de crear la ruta
          this.navCtrl.navigateRoot('/inicio', {
            queryParams: {
              notificationMessage: 'Ruta Creada con Éxito',
              notificationType: 'success'
            }
          });
        },
        error: (err) => {
          this.showNotification('Error al crear la ruta', 'error');
          console.error('Error al crear la ruta', err);
        }
      });
    } else {
      console.log('Formulario inválido o faltan paradas');
      this.showNotification('Por favor, complete el formulario correctamente y agregue al menos dos paradas.', 'success');
      
    }
  }

  testNotification() {
    console.log('Testing notification...');
    this.showNotification('¡Esta es una notificación de prueba!', 'success');
  }
}
