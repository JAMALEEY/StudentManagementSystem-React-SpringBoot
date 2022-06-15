package ma.youcode.simstara.exception;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.ZoneId;
import java.time.ZonedDateTime;

// Telling spring that this class will have methods that handle exceptions
@ControllerAdvice
public class ApiExceptionHandler {

//    telling spring that the following method will handle exceptions
    @ExceptionHandler ( value = ApiRequestException.class)
    public ResponseEntity<Object> handleApiRequestException(ApiRequestException e){
//        1/ create payload containing exception details
        HttpStatus badRequest = HttpStatus.BAD_REQUEST;
//         I store it in a variable because it's occuring more than one time (badRequest)
        ApiException apiException = new ApiException(
                e.getMessage(),
                e,
                badRequest,
                ZonedDateTime.now(ZoneId.of("Z"))
        );
//        2/ return response entity
        return new ResponseEntity<>(apiException, badRequest);
    }
}
