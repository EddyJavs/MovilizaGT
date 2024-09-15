package gt.app.MovilizaGT.service;

import gt.app.MovilizaGT.Utils.Response.RegisterResponse;
import gt.app.MovilizaGT.repository.UserRepository;
import gt.app.MovilizaGT.entity.Person;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Optional<Person> login(String email, String pass) {
        return userRepository.findByEmailAndPass(email, pass);
    }


    public RegisterResponse register(Person user) throws Exception {
        try {
            Optional<Person> existingUser = userRepository.findByDpiOrEmail(user.getDpi(), user.getEmail());
            if (existingUser.isPresent()) {
                throw new Exception("Usuario con el Email "+user.getEmail() +" ya esta registrado");
            }
        } catch (Exception e) {
            e.printStackTrace();
            RegisterResponse r = new RegisterResponse();
            r.setMessage("Usuario con el Email "+user.getEmail() +" ya esta registrado");
            r.setSuccess(false);
            return r;
        }
        Person p =userRepository.save(user);
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