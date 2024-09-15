package gt.app.MovilizaGT.service;

import gt.app.MovilizaGT.entity.Route;
import gt.app.MovilizaGT.entity.Stand;
import gt.app.MovilizaGT.repository.RouteRepository;
import gt.app.MovilizaGT.repository.StandRepository;
import gt.app.MovilizaGT.Utils.Request.CreateRouteRequest;
import gt.app.MovilizaGT.Utils.Request.CreateStandRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.locationtech.jts.geom.Coordinate;

import java.util.List;

@Service
public class RouteService {

    @Autowired
    private RouteRepository routeRepository;

    @Autowired
    private StandRepository standRepository;

    // Instancia de GeometryFactory para crear objetos Point
    private final GeometryFactory geometryFactory = new GeometryFactory();

    public boolean createRoute(CreateRouteRequest routeRequest) {
        try {
            // Crea una nueva ruta
            Route newRoute = new Route();
            newRoute.setDepartureTime(routeRequest.getDepartureTime());
            newRoute.setDepartureDate(routeRequest.getDepartureDate());
            newRoute.setAvailableSeats(routeRequest.getAvailableSeats());
            newRoute.setFK_userId(routeRequest.getFK_userId());

            // Guarda la ruta en la base de datos
            Route savedRoute = routeRepository.save(newRoute);

            // Ahora, guarda las paradas intermedias (stand)
            List<CreateStandRequest> stands = routeRequest.getStands();
            for (CreateStandRequest standRequest : stands) {
                // Crea un objeto Point a partir de las coordenadas
                Point stopPoint = geometryFactory.createPoint(new Coordinate(standRequest.getLongitude(), standRequest.getLatitude()));

                Stand newStand = new Stand();
                newStand.setStopPoint(stopPoint);
                newStand.setCorrelative(standRequest.getCorrelative());
                newStand.setDepartureTime(standRequest.getDepartureTime());
                newStand.setFK_routeId(savedRoute.getRouteId());

                // Guarda cada parada en la base de datos
                standRepository.save(newStand);
            }

            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
