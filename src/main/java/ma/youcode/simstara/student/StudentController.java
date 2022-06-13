package ma.youcode.simstara.student;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/students")
public class StudentController {
    @GetMapping
    public List<Student> getAllStudents(){
        return List.of(
                new Student(
                        UUID.randomUUID(),
                        "yasser",
                        "jeei",
                        "y@gmail.com",
                        Student.Gender.Male
                ),
                new Student(
                        UUID.randomUUID(),
                        "youssef",
                        "DIOUANI",
                        "d@gmail.com",
                        Student.Gender.Female
                ),
                new Student(
                        UUID.randomUUID(),
                        "SIMO",
                        "POKARI",
                        "s@gmail.com",
                        Student.Gender.Robot
                )
        );
    }
}
