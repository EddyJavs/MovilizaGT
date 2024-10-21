package gt.app.MovilizaGT.controller;

import gt.app.MovilizaGT.Utils.Request.QualificationRequest;
import gt.app.MovilizaGT.Utils.Response.QualificationResponse;
import gt.app.MovilizaGT.Utils.Response.QualificationSummaryResponse;
import gt.app.MovilizaGT.entity.Qualification;
import gt.app.MovilizaGT.entity.Person;
import gt.app.MovilizaGT.entity.Trip;
import gt.app.MovilizaGT.service.QualificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class QualificationController {

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

    // Nuevo endpoint para obtener la lista de calificaciones y el promedio
    // Endpoint para listar calificaciones por FK_userId2
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/qualifications/{userId}")
    public ResponseEntity<Map<String, Object>> getQualificationsByUserId(@PathVariable Integer userId) {
        Map<String, Object> response = qualificationService.getQualificationsSummaryByUserId(userId);
        return ResponseEntity.ok(response);
    }
}
