package gt.app.MovilizaGT.service;

import gt.app.MovilizaGT.entity.Person;
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

@Service
public class TripService {

    @Autowired
    private TripRepository tripRepository;

    @Autowired
    private RouteRepository routeRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public Trip createTrip(Trip trip) throws Exception {
        try {
            // Verifica que el número de asientos requeridos sea menor o igual a los asientos disponibles en la ruta
            Route route = routeRepository.findById(trip.getRoute().getRouteId())
                    .orElseThrow(() -> new IllegalArgumentException("La ruta no existe"));

            System.out.println("Ruta encontrada: " + route.getRouteId());

            if (trip.getNeededSeats() > route.getAvailableSeats()) {
                throw new IllegalArgumentException("Los asientos requeridos superan los asientos disponibles.");
            }

            // Reducir los asientos disponibles en la ruta
            route.setAvailableSeats(route.getAvailableSeats() - trip.getNeededSeats());
            routeRepository.save(route);

            // Establecer valores iniciales para el viaje
            trip.setAgreedPrice(BigDecimal.ZERO);  // Precio inicial 0
            trip.setStatusTrip("pendiente");       // Estado inicial pendiente
            trip.setAcceptedAt(LocalDateTime.of(1970, 1, 1, 0, 0, 0));  // Fecha inicial no aceptado

            System.out.println("Trip ready to save: " + trip);

            Trip savedTrip = tripRepository.save(trip);
            System.out.println("Trip guardado correctamente");
            return savedTrip;
        } catch (Exception e) {
            // Log detallado del error
            System.err.println("Error al crear el viaje: " + e.getMessage());
            throw new Exception("Error al crear el viaje", e); // Lanzar el error con el mensaje original
        }
    }

}
