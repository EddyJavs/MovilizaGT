package gt.app.MovilizaGT.controller;

import gt.app.MovilizaGT.Utils.Response.TripResponse;
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
    public ResponseEntity<TripResponse> createTrip(@RequestBody Map<String, Object> tripData) {
        try {
            Integer FK_userId = (Integer) tripData.get("FK_userId");
            Integer FK_routeId = (Integer) tripData.get("FK_routeId");

            if (FK_userId == null || FK_routeId == null) {
                return ResponseEntity.badRequest().body(new TripResponse(false, "Faltan FK_userId o FK_routeId"));
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

            // Validamos los campos tripStart y tripEnd antes de procesar
            String tripStartStr = (String) tripData.get("tripStart");
            String tripEndStr = (String) tripData.get("tripEnd");

            if (tripStartStr == null || tripEndStr == null) {
                return ResponseEntity.badRequest().body(new TripResponse(false, "Faltan las fechas de inicio o fin del viaje"));
            }

            try {
                trip.setTripStart(LocalDateTime.parse(tripStartStr));
                trip.setTripEnd(LocalDateTime.parse(tripEndStr));
            } catch (Exception e) {
                return ResponseEntity.badRequest().body(new TripResponse(false, "Formato incorrecto en tripStart o tripEnd"));
            }

            trip.setUser(user);
            trip.setRoute(route);

            // Llamar al servicio para guardar el viaje
            TripResponse response = tripService.createTrip(trip);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(500).body(new TripResponse(false, "Error interno del servidor"));
        }
    }
}
