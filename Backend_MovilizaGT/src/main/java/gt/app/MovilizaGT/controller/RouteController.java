package gt.app.MovilizaGT.controller;

import gt.app.MovilizaGT.Utils.Request.CreateRouteRequest;
import gt.app.MovilizaGT.Utils.Response.RouteResponse;
import gt.app.MovilizaGT.service.QualificationService;
import gt.app.MovilizaGT.service.RouteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

import java.util.List;
import java.util.Map;
import java.util.Collections;

@RestController
@RequestMapping("/api")
public class RouteController {

    @Autowired
    private RouteService routeService;

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/createRoute")
    public ResponseEntity<RouteResponse> createRoute(@RequestBody CreateRouteRequest route) {
        try {
            RouteResponse createdRoute = routeService.createRoute(route);
            return ResponseEntity.ok(createdRoute);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(401).body(null);
        }
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/searchRoutes")
    public ResponseEntity<?> searchRoutes(@RequestParam double latitudInicio,
                                          @RequestParam double longitudInicio,
                                          @RequestParam double latitudDestino,
                                          @RequestParam double longitudDestino,
                                          @RequestParam String horaViaje,
                                          @RequestParam String fechaViaje) {

        try {
            // Valida que la fecha tenga el formato correcto (YYYY-MM-DD)
            DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            LocalDate fecha = LocalDate.parse(fechaViaje, dateFormatter);

            // Valida que la hora tenga el formato correcto (HH:mm:ss)
            DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm:ss");
            LocalTime hora = LocalTime.parse(horaViaje, timeFormatter);

            // Llama al servicio para buscar rutas
            List<Map<String, Object>> rutasEncontradas = routeService.searchRoutes(
                    latitudInicio, longitudInicio,
                    latitudDestino, longitudDestino,
                    fecha, hora);

            return ResponseEntity.ok(rutasEncontradas);
        } catch (DateTimeParseException e) {
            // En caso de error de formato de fecha/hora, devuelve un mensaje de error
            Map<String, String> errorResponse = Collections.singletonMap("error", "Formato de fecha u hora incorrecto");
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }





}
