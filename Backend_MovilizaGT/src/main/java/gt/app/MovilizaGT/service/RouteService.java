package gt.app.MovilizaGT.service;

import gt.app.MovilizaGT.Utils.Response.RegisterResponse;
import gt.app.MovilizaGT.entity.Person;
import gt.app.MovilizaGT.repository.RouteRepository;
import gt.app.MovilizaGT.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RouteService {

    @Autowired
    private RouteRepository routeRepository;

    public RegisterResponse register(Person user) throws Exception {
        try {
            Optional<Person> existingUser = routeRepository.findByDpiOrEmail(user.getDpi(), user.getEmail());
            System.out.println(existingUser);
            if (existingUser.isPresent()) {
                throw new Exception("Usuario con el Email "+user.getEmail() +" ya esta registrado");
            }
        } catch (Exception e) {
            e.printStackTrace();
            RegisterResponse r = new RegisterResponse();
            r.setMessage("Error al registrar el usuario");
            r.setSuccess(false);
            return r;
        }
        Person p =routeRepository.save(user);
        if (p == null) {
            RegisterResponse r = new RegisterResponse();
            r.setMessage("Usuario no registrado");
            r.setSuccess(false);
            return r;
        }else{
            RegisterResponse r = new RegisterResponse();
            r.setMessage("Usuario registrado");
            r.setSuccess(true);
            return r;
        }
    }


}
