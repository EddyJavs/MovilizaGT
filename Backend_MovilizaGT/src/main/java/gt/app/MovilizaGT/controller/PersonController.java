package gt.app.MovilizaGT.controller;

import gt.app.MovilizaGT.Utils.Response.RegisterResponse;
import gt.app.MovilizaGT.service.UserService;
import gt.app.MovilizaGT.Utils.Request.LoginRequest;
import gt.app.MovilizaGT.entity.Person;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class PersonController {

    @Autowired
    private UserService userService;

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Optional<Person> user = userService.login(loginRequest.getEmail(), loginRequest.getPass());

        if (user.isPresent()) {
            Person person = user.get();
            //System.out.println(person.toString());
            return ResponseEntity.ok(person);
        } else {
            return ResponseEntity.status(401).body("Usuario o contraseña incorrectos.");
        }
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(@RequestBody Person user) {
        try {
            RegisterResponse registeredUser = userService.register(user);
            return ResponseEntity.ok(registeredUser);
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(401).body(null
            );
        }

    }



    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/usersByAccountStatus")
    public ResponseEntity<List<Person>> getUsersByAccountStatus(@RequestParam Integer accountStatus) {
        try {
            List<Person> users = userService.getUsersByAccountStatus(accountStatus);
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }
}