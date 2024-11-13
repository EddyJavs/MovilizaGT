package gt.app.MovilizaGT.service;

import gt.app.MovilizaGT.Utils.Response.RegisterResponse;
import gt.app.MovilizaGT.repository.UserRepository;
import gt.app.MovilizaGT.entity.Person;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.List;


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

    public List<Person> getUsersByAccountStatus(Integer accountStatus) {
        return userRepository.findAllByAccountStatus(accountStatus);
    }


    // Método para actualizar el accountStatus de un usuario
    public boolean updateAccountStatus(Integer userId, int accountStatus) {
        if (userId == null) {
            throw new IllegalArgumentException("El ID del usuario no puede ser nulo.");
        }

        Optional<Person> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            Person user = userOptional.get();
            user.setAccountStatus(accountStatus);
            userRepository.save(user);
            return true;
        }
        return false;
    }
}
