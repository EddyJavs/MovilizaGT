package gt.app.MovilizaGT.controller;

import gt.app.MovilizaGT.entity.Person;
import gt.app.MovilizaGT.entity.Route;
import gt.app.MovilizaGT.entity.Trip;
import gt.app.MovilizaGT.service.TripService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class TripController {

    @Autowired
    private TripService tripService;

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/createTrip")
    public ResponseEntity<?> createTrip(@RequestBody Map<String, Object> tripData) {
        try {
            Integer FK_userId = (Integer) tripData.get("FK_userId");
            Integer FK_routeId = (Integer) tripData.get("FK_routeId");

            if (FK_userId == null || FK_routeId == null) {
                return ResponseEntity.badRequest().body(Collections.singletonMap("error", "Faltan FK_userId o FK_routeId"));
            }

            Person user = new Person();
            user.setUserId(FK_userId);

            Route route = new Route();
            route.setRouteId(FK_routeId);

            // Crear el objeto Trip
            Trip trip = new Trip();
            trip.setStartPoints((String) tripData.get("startPoints"));
            trip.setEndPoints((String) tripData.get("endPoints"));
            trip.setNeededSeats((Integer) tripData.get("neededSeats"));
            trip.setTripStart(LocalDateTime.parse((String) tripData.get("tripStart")));
            trip.setTripEnd(LocalDateTime.parse((String) tripData.get("tripEnd")));
            trip.setUser(user);
            trip.setRoute(route);

            // Llamar al servicio para guardar el viaje
            Trip createdTrip = tripService.createTrip(trip);
            return ResponseEntity.ok(createdTrip);

        } catch (Exception e) {
            return ResponseEntity.status(500).body(Collections.singletonMap("error", "Error interno del servidor: " + e.getMessage()));
        }
    }
}
