package gt.app.MovilizaGT.controller;

import gt.app.MovilizaGT.Utils.Request.QualificationRequest;
import gt.app.MovilizaGT.Utils.Response.QualificationResponse;
import gt.app.MovilizaGT.Utils.Response.QualificationSummaryResponse;
import gt.app.MovilizaGT.entity.Qualification;
import gt.app.MovilizaGT.entity.Person;
import gt.app.MovilizaGT.entity.Trip;
import gt.app.MovilizaGT.service.QualificationService;
import gt.app.MovilizaGT.service.RouteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class QualificationController {
    @Autowired
    private RouteService routeService;

    @Autowired
    private QualificationService qualificationService;

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/createQualification")
    public ResponseEntity<QualificationResponse> createQualification(@RequestBody QualificationRequest request) {
        try {
            // Convertir el objeto QualificationRequest a Qualification
            Qualification qualification = new Qualification();

            Person user1 = new Person();
            user1.setUserId(request.getFK_userId1());
            qualification.setUser1(user1);

            Person user2 = new Person();
            user2.setUserId(request.getFK_userId2());
            qualification.setUser2(user2);

            Trip trip = new Trip();
            trip.setTripId(request.getFK_tripId());
            qualification.setTrip(trip);

            qualification.setScore(request.getScore());
            qualification.setMessage(request.getMessage());

            // Llamar al servicio para guardar la calificación
            QualificationResponse response = qualificationService.createQualification(qualification);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(new QualificationResponse(false, "Error interno del servidor"));
        }
    }



    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/qualifications/route/{routeId}")
    public ResponseEntity<Map<String, Object>> getQualificationsByRouteId(@PathVariable Integer routeId) {
        try {
            // Obtener el userId usando el routeId
            Integer userId = routeService.getUserIdByRouteId(routeId);

            // Usar el userId para obtener las calificaciones
            Map<String, Object> response = qualificationService.getQualificationsSummaryByUserId(userId);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            // Manejar el caso donde el routeId no sea válido
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Route not found for routeId: " + routeId));
        }
    }


}
