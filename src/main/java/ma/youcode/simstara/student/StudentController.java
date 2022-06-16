package ma.youcode.simstara.student;

import ma.youcode.simstara.exception.ApiRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("students")
public class StudentController {
    private final StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping
    public List<Student> getAllStudents() {
//        throw new IllegalStateException("Oops cannot get all students");
//        throw new ApiRequestException("Oops Something went wrong ... we cannot get students");
        return studentService.getAllStudents();
    }

    @GetMapping(path = "{studentId}/courses")
    public List<StudentCourse> getAllCoursesForStudent(
            @PathVariable("studentId") UUID studentId) {
        return studentService.getAllCoursesForStudent(studentId);
    }
    @PostMapping
    public void addNewStudent (@RequestBody @Valid Student student){
         studentService.addNewStudent(student);
    }


    @PutMapping(path = "{studentId}")
    public void updateStudent(@PathVariable("studentId") UUID studentId,
                              @RequestBody Student student) {
        studentService.updateStudent(studentId, student);
    }

    @DeleteMapping("{studentId}")
    public void deleteStudent(@PathVariable("studentId") UUID studentId) {
        studentService.deleteStudent(studentId);
    }


}
