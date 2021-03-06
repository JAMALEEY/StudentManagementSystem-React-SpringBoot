package ma.youcode.simstara.student;

import ma.youcode.simstara.EmailValidator;
import ma.youcode.simstara.exception.ApiRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

// All about business logic
@Service
public class StudentService {
    public Object addNewStudent;
    private final StudentDataAccessObject studentDataAccessObject;
    private final EmailValidator emailValidator;




    @Autowired
    public StudentService(StudentDataAccessObject studentDataAccessObject, EmailValidator emailValidator) {
        this.studentDataAccessObject = studentDataAccessObject;
        this.emailValidator = emailValidator;
    }

    public List<Student> getAllStudents() {
        return studentDataAccessObject.selectAllStudents();
    }

    void addNewStudent(Student student) {
        addNewStudent(null, student);

    }

    void addNewStudent(UUID studentId, Student student) {
        UUID newStudentId = Optional.ofNullable(studentId).orElse(UUID.randomUUID());
//        SERVER SIDE EMAIL VALIDATION :
        boolean checkingEmail = emailValidator.test(student.getEmail());
        if (!checkingEmail) {
            throw new ApiRequestException(student.getEmail() + " is not valid please respect the email pattern");
        }
//         SERVER SIDE EMAIL CONTROL NOT TAKEN
        if (studentDataAccessObject.isEmailTaken(student.getEmail())){
            throw new ApiRequestException(student.getEmail() + " is already taken (bad UX)");
        }


        studentDataAccessObject.insertStudent(newStudentId, student);

    }

    public List<StudentCourse> getAllCoursesForStudent(UUID studentId) {
        return studentDataAccessObject.selectAllStudentCourses(studentId);
    }
}
