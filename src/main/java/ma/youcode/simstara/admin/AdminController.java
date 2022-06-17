package ma.youcode.simstara.admin;

import ma.youcode.simstara.student.Student;
import ma.youcode.simstara.student.StudentCourse;
import ma.youcode.simstara.student.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
public class AdminContoller {

        // autowire the service
        @Autowired
        private AuthService authService;

        @PostMapping("/login")
        public AuthenticationResponse login(@RequestBody LoginRequest loginRequest){
            return authService.login(loginRequest);
        }

    }