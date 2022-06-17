package ma.youcode.simstara.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AdminController {

        // autowire the service
        @Autowired
        private AuthService authService;

        @PostMapping("/login")
        public AuthenticationResponse login(@RequestBody LoginRequest loginRequest){
            return authService.login(loginRequest);
        }

    }