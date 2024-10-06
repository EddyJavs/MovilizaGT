package gt.app.MovilizaGT.repository;

import gt.app.MovilizaGT.entity.Route;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;


@Repository
public interface RouteRepository extends JpaRepository<Route, Integer> {
    @Query(value = "SELECT r.routeId, r.departureTime, r.departureDate, r.availableSeats, " +
            "ST_X(sInicio.stopPoint) AS latitudeStartPoint, ST_Y(sInicio.stopPoint) AS longitudeStartPoint, " +
            "ST_X(sDestino.stopPoint) AS latitudeEndPoint, ST_Y(sDestino.stopPoint) AS longitudeEndPoint, " +
            "p.fullName AS driverName, v.model AS vehicleModel, v.line AS vehicleLine, v.brand AS vehicleBrand, v.category AS vehicleCategory " +
            "FROM route r " +
            "JOIN stand sInicio ON r.routeId = sInicio.FK_routeId " +
            "JOIN stand sDestino ON r.routeId = sDestino.FK_routeId " +
            "JOIN person p ON r.FK_userId = p.userId " +
            "JOIN vehicle v ON p.userId = v.FK_userId " +
            "WHERE ST_Distance_Sphere(POINT(:longitudInicio, :latitudInicio), POINT(ST_Y(sInicio.stopPoint), ST_X(sInicio.stopPoint))) < 500 " +  // Distancia de inicio
            "AND ST_Distance_Sphere(POINT(:longitudDestino, :latitudDestino), POINT(ST_Y(sDestino.stopPoint), ST_X(sDestino.stopPoint))) < 500 " +  // Distancia de destino
            "AND sInicio.correlative < sDestino.correlative " +
            "AND r.departureDate = :fecha " +
            "AND sInicio.departureTime BETWEEN SUBTIME(:hora, '00:15:00') AND ADDTIME(:hora, '00:15:00')", // Añadir +- 15 minutos a la hora
            nativeQuery = true)
    List<Object[]> findRoutesByCoordinates(@Param("latitudInicio") double latitudInicio,
                                           @Param("longitudInicio") double longitudInicio,
                                           @Param("latitudDestino") double latitudDestino,
                                           @Param("longitudDestino") double longitudDestino,
                                           @Param("fecha") String fecha,  // String (formato YYYY-MM-DD)
                                           @Param("hora") String hora);   // String (formato HH:MM:SS)

}
