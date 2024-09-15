package gt.app.MovilizaGT.controller;

import gt.app.MovilizaGT.Utils.Request.LoginRequest;
import gt.app.MovilizaGT.Utils.Response.RegisterResponse;
import gt.app.MovilizaGT.entity.Person;
import gt.app.MovilizaGT.service.RouteService;
import gt.app.MovilizaGT.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class RouteController {

    @Autowired
    private RouteService routeService;

}