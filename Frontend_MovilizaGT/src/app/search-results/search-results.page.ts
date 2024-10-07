import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private route: ActivatedRoute) {
    this.geocoder = new google.maps.Geocoder();  // Inicializa el geocoder de Google Maps
  }

  ngOnInit() {
    // Obtener los parámetros con las rutas
    this.route.queryParams.subscribe(params => {
      if (params['routes']) {
        this.routes = JSON.parse(params['routes']);

        // Para cada ruta, obtener el nombre del lugar desde las coordenadas
        this.routes.forEach((route: any) => {
          this.getPlaceNameFromCoordinates(route.latitudeStartPoint, route.longitudeStartPoint, 'startLocation', route);
          this.getPlaceNameFromCoordinates(route.latitudeEndPoint, route.longitudeEndPoint, 'endLocation', route);
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
    const latlng = { lat: parseFloat(lat+''), lng: parseFloat(lng+'') };
    
    this.geocoder.geocode({ location: latlng }, (results: any, status: any) => {
      if (status === 'OK' && results[0]) {
        route[key] = results[0].formatted_address;  // Asignar el nombre del lugar
      } else {
        console.error('Error al obtener el nombre del lugar:', status);
        route[key] = `${lat}, ${lng}`;  // Si no se puede obtener el nombre, mostrar las coordenadas
      }
    });
  }
}
