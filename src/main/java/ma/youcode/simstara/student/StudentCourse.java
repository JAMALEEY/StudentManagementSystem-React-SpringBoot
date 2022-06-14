package ma.youcode.simstara.student;

import java.time.LocalDate;
import java.util.UUID;

public class StudentCourse {
    private final UUID studentId;
    private final UUID courseId;
    private final String name;
    private final String department;
    private final String teacherName;
    private final LocalDate startDate;
    private final LocalDate endDate;
    private final Integer grade;

    public StudentCourse(UUID studentId, UUID courseId, String name, String department, String teacherName, String teacher_name, LocalDate startDate, LocalDate endDate, Integer grade) {
        this.studentId = studentId;
        this.courseId = courseId;
        this.name = name;
        this.department = department;
        this.teacherName = teacherName;
        this.startDate = startDate;
        this.endDate = endDate;
        this.grade = grade;
    }

    public UUID getStudentId() {
        return studentId;
    }

    public UUID getCourseId() {
        return courseId;
    }

    public String getName() {
        return name;
    }

    public String getDepartment() {
        return department;
    }

    public String getTeacherName() {
        return teacherName;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public Integer getGrade() {
        return grade;
    }

    @Override
    public String toString() {
        return "StudentCourse{" +
                "studentId=" + studentId +
                ", courseId=" + courseId +
                ", name='" + name + '\'' +
                ", department='" + department + '\'' +
                ", teacherName='" + teacherName + '\'' +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", grade=" + grade +
                '}';
    }
}
