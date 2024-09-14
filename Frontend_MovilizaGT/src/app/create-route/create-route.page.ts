import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonInput } from '@ionic/angular';

declare var google: any;

@Component({
  selector: 'app-create-route',
  templateUrl: './create-route.page.html',
  styleUrls: ['./create-route.page.scss'],
})
export class CreateRoutePage implements AfterViewInit {
  routeForm: FormGroup;
  private map: any;
  private originMarker: any;
  private destinationMarker: any;
  private directionsService: any;
  private directionsRenderer: any;

  @ViewChild('originInput', { static: false }) originInput!: IonInput;
  @ViewChild('destinationInput', { static: false }) destinationInput!: IonInput;

  constructor(private fb: FormBuilder) {
    this.routeForm = this.fb.group({
      startTime: ['', Validators.required],
      startDate: ['', Validators.required],
      availableSeats: ['', [Validators.required, Validators.min(1)]],
      startLocation: ['', Validators.required],
      endLocation: ['', Validators.required],
    });

    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.directionsRenderer.setMap(this.map);
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.initAutocomplete();
    this.directionsRenderer.setMap(this.map);
  }

  initMap(): void {
    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center: { lat: 14.634915, lng: -90.506882 },
      zoom: 12,
    });
  }

  async initAutocomplete() {

    // Autocompletado para el punto de origen
    const originInputElement = await this.originInput.getInputElement();
    this.setupAutocomplete(originInputElement, 'origin');

    // Autocompletado para el punto de destino
    const destinationInputElement = await this.destinationInput.getInputElement();
    this.setupAutocomplete(destinationInputElement, 'destination');
  }

  setupAutocomplete(inputElement: HTMLInputElement, type: 'origin' | 'destination'): void {
    const autocomplete = new google.maps.places.Autocomplete(inputElement, {
      componentRestrictions: { country: 'GT' }, // Restringir a Guatemala
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.geometry || !place.geometry.location) {
        return;
      }

      // Centrar el mapa en el lugar seleccionado
      this.map.setCenter(place.geometry.location);
      this.map.setZoom(15);

      // Marcar el lugar seleccionado en el mapa
      if (type === 'origin') {
        if (this.originMarker) {
          this.originMarker.setPosition(place.geometry.location);
        } else {
          this.originMarker = new google.maps.Marker({
            position: place.geometry.location,
            map: this.map,
            title: 'Punto de Origen',
          });
        }
        // Actualiza el campo de origen en el formulario
        this.routeForm.patchValue({ startLocation: place.formatted_address });
        this.calculateAndDisplayRoute();
      } else if (type === 'destination') {
        if (this.destinationMarker) {
          this.destinationMarker.setPosition(place.geometry.location);
        } else {
          this.destinationMarker = new google.maps.Marker({
            position: place.geometry.location,
            map: this.map,
            title: 'Punto de Destino',
          });
        }
        // Actualiza el campo de destino en el formulario
        this.routeForm.patchValue({ endLocation: place.formatted_address });
        this.calculateAndDisplayRoute();
      }
    });
  }

  calculateAndDisplayRoute() {
    console.log(" origin marker");
    console.log(this.originMarker);
    console.log(" destination marker");
    console.log(this.destinationMarker);
    if (this.originMarker && this.destinationMarker) {
      console.log(" CREANDO RUTA CON AMBOS PUNTOS");
      const origin = this.originMarker.getPosition();
      const destination = this.destinationMarker.getPosition();

      const request = {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,  // Puedes cambiar el modo de viaje
      };

      this.directionsService.route(request, (result: any, status: any) => {
        if (status === google.maps.DirectionsStatus.OK) {
          console.log('Ruta trazada:', result);
          this.directionsRenderer.setDirections(result);
        } else {
          console.error('Error al trazar la ruta:', status);
        }
      });
    }
  }

  onCreateRoute(): void {
    if (this.routeForm.valid) {
      console.log('Formulario válido', this.routeForm.value);
    } else {
      console.log('Formulario inválido');
    }
  }
}
