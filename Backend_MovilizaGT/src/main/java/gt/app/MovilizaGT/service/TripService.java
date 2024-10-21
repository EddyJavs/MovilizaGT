package gt.app.MovilizaGT.service;

import gt.app.MovilizaGT.Utils.Response.TripResponse;
import gt.app.MovilizaGT.entity.Route;
import gt.app.MovilizaGT.entity.Trip;
import gt.app.MovilizaGT.repository.RouteRepository;
import gt.app.MovilizaGT.repository.TripRepository;
import gt.app.MovilizaGT.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;


@Service
public class TripService {

    @Autowired
    private TripRepository tripRepository;

    @Autowired
    private RouteRepository routeRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public TripResponse createTrip(Trip trip) throws Exception {
        try {
            // Verifica que el número de asientos requeridos sea menor o igual a los asientos disponibles en la ruta
            Route route = routeRepository.findById(trip.getRoute().getRouteId())
                    .orElseThrow(() -> new IllegalArgumentException("La ruta no existe"));

            if (trip.getNeededSeats() > route.getAvailableSeats()) {
                return new TripResponse(false, "Los asientos requeridos superan los asientos disponibles.");
            }

            // Reducir los asientos disponibles en la ruta
            route.setAvailableSeats(route.getAvailableSeats() - trip.getNeededSeats());
            routeRepository.save(route);

            // Procesar las coordenadas de los puntos de inicio y fin
            String[] startCoords = trip.getStartPoints().split(", ");
            String[] endCoords = trip.getEndPoints().split(", ");

            double startLat = Double.parseDouble(startCoords[0]);
            double startLon = Double.parseDouble(startCoords[1]);
            double endLat = Double.parseDouble(endCoords[0]);
            double endLon = Double.parseDouble(endCoords[1]);

            // Establecer valores iniciales para el viaje
            trip.setAgreedPrice(BigDecimal.ZERO);  // Precio inicial 0
            trip.setStatusTrip("pendiente");       // Estado inicial pendiente
            trip.setAcceptedAt(LocalDateTime.of(1970, 1, 1, 0, 0, 0));  // Fecha inicial no aceptado

            // Guardar el viaje con las coordenadas procesadas
            tripRepository.saveTrip(startLat, startLon, endLat, endLon, trip.getAgreedPrice(),
                    trip.getStatusTrip(), trip.getAcceptedAt(), trip.getCreatedAt(), trip.getNeededSeats(),
                    trip.getTripStart(), trip.getTripEnd(), trip.getUser().getUserId(), trip.getRoute().getRouteId());

            return new TripResponse(true, "Viaje Solicitado con Exito");

        } catch (Exception e) {
            // Log detallado del error
            System.err.println("Error al crear el viaje: " + e.getMessage());
            e.printStackTrace();
            return new TripResponse(false, "Error interno del servidor: " + e.getMessage());
        }
    }

    public List<Trip> getTripsByRouteCreator(Integer userIdCreator) {
        return tripRepository.findTripsByRouteCreator(userIdCreator);
    }


}
