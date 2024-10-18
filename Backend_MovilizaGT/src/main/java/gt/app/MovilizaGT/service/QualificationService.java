package gt.app.MovilizaGT.service;

import gt.app.MovilizaGT.Utils.Response.QualificationResponse;
import gt.app.MovilizaGT.Utils.Response.QualificationSummaryResponse;
import gt.app.MovilizaGT.entity.Qualification;
import gt.app.MovilizaGT.repository.QualificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.OptionalDouble;
import java.util.stream.Collectors;

@Service
public class QualificationService {

    @Autowired
    private QualificationRepository qualificationRepository;

    @Transactional
    public QualificationResponse createQualification(Qualification qualification) {
        try {
            if (qualification.getUser1().getUserId() == null ||
                    qualification.getUser2().getUserId() == null ||
                    qualification.getTrip().getTripId() == null) {

                return new QualificationResponse(false, "Los ID de los usuarios y del viaje son obligatorios.");
            }

            qualificationRepository.save(qualification);
            return new QualificationResponse(true, "Calificación enviada con éxito.");
        } catch (Exception e) {
            e.printStackTrace();
            return new QualificationResponse(false, "Error interno del servidor.");
        }
    }

    public Map<String, Object> getQualificationsSummaryByUserId(Integer userId) {
        List<Qualification> qualifications = qualificationRepository.findByUser2UserId(userId);

        Double averageScore = qualifications.stream()
                .mapToDouble(Qualification::getScore)
                .average()
                .orElse(0.0);

        List<Map<String, Object>> filteredQualifications = qualifications.stream()
                .map(qualification -> {
                    Map<String, Object> item = new HashMap<>();
                    item.put("ratingId", qualification.getRatingId());
                    item.put("score", qualification.getScore());
                    item.put("message", qualification.getMessage());
                    item.put("user1", qualification.getUser1().getFullName());
                    item.put("user2", qualification.getUser2().getFullName());
                    return item;
                }).collect(Collectors.toList());

        Map<String, Object> response = new HashMap<>();
        response.put("qualifications", filteredQualifications);
        response.put("averageScore", averageScore);

        return response;
    }
}
