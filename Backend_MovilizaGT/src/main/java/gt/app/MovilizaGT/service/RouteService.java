package gt.app.MovilizaGT.service;

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

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class RouteService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RouteRepository routeRepository;

    @Autowired
    private StandRepository standRepository;

    // Lógica para la creación de rutas (sin cambios)
    @Transactional
    public RouteResponse createRoute(CreateRouteRequest routeRequest) {
        try {
            Person person = userRepository.findById(routeRequest.getFK_userId())
                    .orElseThrow(() -> new IllegalArgumentException("User not found"));

            Route newRoute = new Route();
            newRoute.setDepartureTime(routeRequest.getDepartureTime());
            newRoute.setDepartureDate(routeRequest.getDepartureDate());
            newRoute.setAvailableSeats(routeRequest.getAvailableSeats());
            newRoute.setPerson(person);

            // Guardar la ruta
            Route r = routeRepository.save(newRoute);

            // Guardar las paradas intermedias (stands)
            List<CreateStandRequest> stands = routeRequest.getStands();
            for (CreateStandRequest standRequest : stands) {
                standRepository.saveStand(
                        standRequest.getLatitude(),
                        standRequest.getLongitude(),
                        standRequest.getCorrelative(),
                        standRequest.getDepartureTime(),
                        r.getRouteId()
                );
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

    // Lógica para la búsqueda de rutas, incluyendo la información del conductor y del vehículo
    public List<Map<String, Object>> searchRoutes(double latitudInicio, double longitudInicio,
                                                  double latitudDestino, double longitudDestino,
                                                  LocalDate fechaRecibida, LocalTime horaRecibida) {

        // Formateamos la fecha y hora para pasarlas al repositorio como strings
        String fecha = fechaRecibida.toString();  // Formato yyyy-MM-dd
        String hora = horaRecibida.format(DateTimeFormatter.ofPattern("HH:mm:ss"));  // Formato HH:mm:ss

        // Llamamos al repositorio para obtener las rutas con la información adicional
        List<Object[]> results = routeRepository.findRoutesByCoordinates(latitudInicio, longitudInicio,
                latitudDestino, longitudDestino,
                fecha, hora);

        List<Map<String, Object>> rutasEncontradas = new ArrayList<>();

        // Procesa los resultados para incluir información de la ruta, conductor y vehículo
        for (Object[] result : results) {
            Map<String, Object> ruta = new HashMap<>();
            ruta.put("routeId", result[0]);
            ruta.put("departureTime", result[1]);
            ruta.put("departureDate", result[2]);
            ruta.put("availableSeats", result[3]);

            // Información adicional de las coordenadas de inicio y destino
            ruta.put("latitudeStartPoint", result[4]);
            ruta.put("longitudeStartPoint", result[5]);
            ruta.put("latitudeEndPoint", result[6]);
            ruta.put("longitudeEndPoint", result[7]);

            // Información del conductor
            ruta.put("driverName", result[8]);

            // Información del vehículo
            ruta.put("vehicleModel", result[9]);
            ruta.put("vehicleLine", result[10]);
            ruta.put("vehicleBrand", result[11]);
            ruta.put("vehicleCategory", result[12]);

            rutasEncontradas.add(ruta);
        }

        return rutasEncontradas;
    }

    // En RouteService
    public Integer getUserIdByRouteId(Integer routeId) {
        return routeRepository.findById(routeId)
                .orElseThrow(() -> new RuntimeException("Route not found with id: " + routeId))
                .getPerson().getUserId();
    }

}
