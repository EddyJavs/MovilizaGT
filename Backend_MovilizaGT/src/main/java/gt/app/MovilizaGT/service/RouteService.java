package gt.app.MovilizaGT.service;

import gt.app.MovilizaGT.Utils.Response.RegisterResponse;
import gt.app.MovilizaGT.Utils.Response.RouteResponse;
import gt.app.MovilizaGT.entity.Person;
import gt.app.MovilizaGT.entity.Route;
import gt.app.MovilizaGT.entity.Stand;
import gt.app.MovilizaGT.repository.RouteRepository;
import gt.app.MovilizaGT.repository.StandRepository;
import gt.app.MovilizaGT.Utils.Request.CreateRouteRequest;
import gt.app.MovilizaGT.Utils.Request.CreateStandRequest;
import gt.app.MovilizaGT.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class RouteService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RouteRepository routeRepository;

    @Autowired
    private StandRepository standRepository;

    @Transactional
    public RouteResponse createRoute(CreateRouteRequest routeRequest) {
        try {
            // Buscar la persona (conductor) por el ID
            Person person = userRepository.findById(routeRequest.getFK_userId())
                    .orElseThrow(() -> new IllegalArgumentException("User not found"));

            // Crear la nueva ruta
            Route newRoute = new Route();
            newRoute.setDepartureTime(routeRequest.getDepartureTime());
            newRoute.setDepartureDate(routeRequest.getDepartureDate());
            newRoute.setAvailableSeats(routeRequest.getAvailableSeats());

            // Asignar la persona (conductor)
            newRoute.setPerson(person);

            // Guardar la ruta
            Route r = routeRepository.save(newRoute);

            // Ahora, guarda las paradas intermedias (stand)
            List<CreateStandRequest> stands = routeRequest.getStands();
            for (CreateStandRequest standRequest : stands) {
                // Guarda cada parada en la base de datos
                standRepository.saveStand(standRequest.getLatitude(),standRequest.getLongitude(),
                        standRequest.getCorrelative(),standRequest.getDepartureTime(),r.getRouteId());
            }
            RouteResponse resp = new RouteResponse();
            resp.setMessage("Ruta Creada con Exito");
            resp.setSuccess(true);
            return resp;

        } catch (Exception e) {
            e.printStackTrace();
            RouteResponse resp = new RouteResponse();
            resp.setMessage("Ruta No Creada");
            resp.setSuccess(false);
            return resp;
        }
    }

}
