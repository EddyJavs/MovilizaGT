package gt.app.MovilizaGT.service;

import gt.app.MovilizaGT.Utils.Request.CreateTripStatusRequest;
import gt.app.MovilizaGT.Utils.Response.StatusResponse;
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
import java.util.Optional;


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

    public List<Trip> getTripsByRouteCreatorAndStatus(Integer userIdCreator, String statusTrip) {
        return tripRepository.findTripsByRouteCreatorAndStatus(userIdCreator, statusTrip);
    }


    public StatusResponse updateTripStatus(CreateTripStatusRequest request) throws Exception {
        // Buscar el viaje por el viajeId proporcionado en el JSON
        Optional<Trip> tripOptional = tripRepository.findById(request.getViajeId());

        if (tripOptional.isPresent()) {
            Trip trip = tripOptional.get();
            String estado = request.getEstado();
            BigDecimal precioRecibido = request.getPrecio() != null ? request.getPrecio() : BigDecimal.ZERO;

            switch (estado) {
                case "2": // Estado 2: Solicitud
                    // Actualizar estado a "solicitado" y limpiar el precio
                    tripRepository.updateStatusToSolicitado(trip.getTripId());
                    return new StatusResponse(true, "El estado del viaje se ha actualizado a 'solicitado'.");

                case "3": // Estado 3: Aceptado
                    if (trip.getAgreedPrice() == null) {
                        // Si el precio acordado es nulo, lo actualiza con el precio recibido
                        tripRepository.updateAgreedPrice(trip.getTripId(), precioRecibido);
                        return new StatusResponse(true, "Precio ingresado exitosamente.");
                    } else if (trip.getAgreedPrice().compareTo(precioRecibido) != 0) {
                        // Si los precios no coinciden
                        return new StatusResponse(false, "El precio proporcionado no coincide con el precio acordado.");
                    } else {
                        // Si los precios coinciden, actualizar estado a "aceptado" y la fecha de aceptación
                        tripRepository.updateStatusToAceptado(trip.getTripId(), LocalDateTime.now());
                        return new StatusResponse(true, "Viaje aceptado con el precio acordado.");
                    }

                default:
                    return new StatusResponse(false, "Estado no válido.");
            }
        } else {
            return new StatusResponse(false, "El viaje con ID " + request.getViajeId() + " no existe.");
        }
    }


}
