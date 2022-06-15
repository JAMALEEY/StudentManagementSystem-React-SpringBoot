package ma.youcode.simstara;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

//    generated with shift ctrl T
public class EmailValidatorTest {
// I generate test method with alt ins

    private final EmailValidator underTest = new EmailValidator();

    @Test
    public void itShouldValidateCorrectEmail() {
        assertThat(underTest.test("hello@gmail.com")).isTrue();
    }

    @Test
    public void itShouldValidateIncorrectEmail() {
        assertThat(underTest.test("hellogmail.com")).isFalse();
    }

    @Test
    public void itShouldValidateIncorrectEmailWithoutDotAtTheEnd() {
        assertThat(underTest.test("hello@gmail")).isFalse();
    }
}