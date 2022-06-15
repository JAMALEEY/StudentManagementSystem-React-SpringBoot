package ma.youcode.simstara;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;


@Configuration
@EnableAutoConfiguration
@ComponentScan
public class SimstaraApplication {

    public static void main(String[] args) {
        SpringApplication.run(SimstaraApplication.class, args);
    }

}
