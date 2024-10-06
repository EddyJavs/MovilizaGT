package gt.app.MovilizaGT.controller;

import gt.app.MovilizaGT.entity.Trip;
import gt.app.MovilizaGT.service.TripService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class TripController {

    @Autowired
    private TripService tripService;

    @PostMapping("/createTrip")
    public ResponseEntity<Trip> createTrip(@RequestBody Trip trip) {
        try {
            Trip createdTrip = tripService.createTrip(trip);
            return ResponseEntity.ok(createdTrip);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}
