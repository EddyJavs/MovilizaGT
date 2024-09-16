package gt.app.MovilizaGT.controller;

import gt.app.MovilizaGT.Utils.Request.CreateRouteRequest;
import gt.app.MovilizaGT.Utils.Response.RouteResponse;
import gt.app.MovilizaGT.Utils.Response.RegisterResponse;
import gt.app.MovilizaGT.service.RouteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class RouteController {

    @Autowired
    private RouteService routeService;

    @PostMapping("/createRoute")
    public ResponseEntity<RouteResponse> createRoute(@RequestBody CreateRouteRequest route) {
        try {
            RouteResponse createdRoute = routeService.createRoute(route);
            return ResponseEntity.ok(createdRoute);
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(401).body(null
            );
        }
    }
}
