package gt.app.MovilizaGT.controller;

import gt.app.MovilizaGT.Utils.Request.UpdateAccountStatusRequest;
import gt.app.MovilizaGT.Utils.Response.RegisterResponse;
import gt.app.MovilizaGT.Utils.Response.StatusResponse;
import gt.app.MovilizaGT.service.GoogleCloudStorageService;
import gt.app.MovilizaGT.service.UserService;
import gt.app.MovilizaGT.Utils.Request.LoginRequest;
import gt.app.MovilizaGT.Utils.Request.RegisterRequest;
import gt.app.MovilizaGT.entity.Person;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class PersonController {

    @Autowired
    private UserService userService;

    @Autowired
    private GoogleCloudStorageService googleCloudStorageService;

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Optional<Person> user = userService.login(loginRequest.getEmail(), loginRequest.getPass());

        if (user.isPresent()) {
            Person person = user.get();
            return ResponseEntity.ok(person);
        } else {
            return ResponseEntity.status(401).body("Usuario o contraseña incorrectos.");
        }
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(
            @RequestParam("email") String email,
            @RequestParam("fullName") String fullName,
            @RequestParam("phone") String phone,
            @RequestParam("dpi") String dpi,
            @RequestParam("gender") String gender,
            @RequestParam("age") Integer age,
            @RequestParam("pass") String pass,
            @RequestParam("dpiFront") MultipartFile dpiFront,
            @RequestParam("dpiBack") MultipartFile dpiBack,
            @RequestParam("licenseFront") MultipartFile licenseFront,
            @RequestParam("licenseBack") MultipartFile licenseBack,
            @RequestParam("photo") MultipartFile photo) {

        try {
            // Crear el objeto Person y establecer sus propiedades
            Person user = new Person();
            user.setEmail(email);
            user.setFullName(fullName);
            user.setPhone(phone);
            user.setDpi(dpi);
            user.setGender(gender);
            user.setAge(age);
            user.setPass(pass);

            // Subir archivos y asignar URLs
            user.setLicenseFront(googleCloudStorageService.uploadFile(licenseFront, "licenses/front"));
            user.setLicenseBack(googleCloudStorageService.uploadFile(licenseBack, "licenses/back"));
            user.setDpiFront(googleCloudStorageService.uploadFile(dpiFront, "dpi/front"));
            user.setDpiBack(googleCloudStorageService.uploadFile(dpiBack, "dpi/back"));
            user.setPhoto(googleCloudStorageService.uploadFile(photo, "photos"));

            // Registrar el usuario y devolver la respuesta
            RegisterResponse registeredUser = userService.register(user);
            return ResponseEntity.ok(registeredUser);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(new RegisterResponse(false, "Error en el registro del usuario"));
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

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/updateAccountStatus")
    public ResponseEntity<StatusResponse> updateAccountStatus(@RequestBody UpdateAccountStatusRequest request) {
        try {
            boolean isUpdated = userService.updateAccountStatus(request.getUserId(), request.getAccountStatus());

            if (isUpdated) {
                return ResponseEntity.ok(new StatusResponse(true, "Estado de la cuenta actualizado con éxito."));
            } else {
                return ResponseEntity.status(404).body(new StatusResponse(false, "Usuario no encontrado."));
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(new StatusResponse(false, "Error interno del servidor."));
        }
    }
}
