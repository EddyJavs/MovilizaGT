package gt.app.MovilizaGT.controller;

import gt.app.MovilizaGT.Utils.Request  .CreateRouteRequest;
import gt.app.MovilizaGT.entity.Route;
import gt.app.MovilizaGT.service.RouteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/route")
public class RouteController {

    @Autowired
    private RouteService routeService;

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/createRoute")
    public ResponseEntity<Boolean> createRoute(@RequestBody CreateRouteRequest routeRequest) {
        boolean success = routeService.createRoute(routeRequest);

        if (success) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.status(400).body(false);
        }
    }
}