package ma.youcode.simstara.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

// All about business logic
@Service
public class StudentService {
    StudentDataAccessObject studentDataAccessObject;

    @Autowired
    public StudentService(StudentDataAccessObject studentDataAccessObject) {
        this.studentDataAccessObject = studentDataAccessObject;
    }

    public List<Student> getAllStudents(){
        return studentDataAccessObject.selectAllStudents();
        }
    }
