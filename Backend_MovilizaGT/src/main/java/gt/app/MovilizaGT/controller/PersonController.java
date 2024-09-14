package gt.app.MovilizaGT.controller;

import gt.app.MovilizaGT.service.UserService;
import gt.app.MovilizaGT.Utils.Request.LoginRequest;
import gt.app.MovilizaGT.entity.Person;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class PersonController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<Boolean> login(@RequestBody LoginRequest loginRequest) {
        Optional<Person> user = userService.login(loginRequest.getEmail(), loginRequest.getPass());

        if (user.isPresent()) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.status(401).body(false);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<Person> register(@RequestBody Person user) {
        try {
            Person registeredUser = userService.register(user);
            return ResponseEntity.ok(registeredUser);
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(401).body(null);
        }

    }
}