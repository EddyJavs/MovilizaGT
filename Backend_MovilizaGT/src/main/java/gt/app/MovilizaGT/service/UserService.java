package gt.app.MovilizaGT.service;

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


    public Person register(Person user) throws Exception {
        Optional<Person> existingUser = userRepository.findByDpiOrEmail(user.getDpi(), user.getEmail());
        if (existingUser.isPresent()) {
            throw new Exception("Usuario con el Email o Correo ingresados ya esta registrado");
        }
        return userRepository.save(user);
    }


}
