package ma.youcode.simstara.student;
import java.util.UUID;

public class Student {
    private final UUID studentId;
    private final String firstName;
    public final String lastName;
    private final String email;
    private final Gender gender;

    public Student(
            UUID studentId,
            String firstName,
            String lastName,
            String email,
            Gender gender
    ) {
        this.studentId = studentId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.gender = gender;
    }

    enum Gender {
        Male, Female, Robot
    }

    public UUID getStudentId() {
        return studentId;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }

    public Gender getGender() {
        return gender;
    }

    // WE HAVE NO SETTERS BECAUSE WE USED FINAL VARIABLES !!!!


    @Override
    public String toString() {
        return "Student{" +
                "studentId=" + studentId +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", gender=" + gender +
                '}';
    }
}
