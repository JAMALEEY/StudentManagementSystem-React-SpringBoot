package ma.youcode.simstara.admin;


import ma.youcode.simstara.admin.security.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class AuthService {


    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtProvider jwtProvider;



    public String encodePassword(String password){
        return passwordEncoder.encode(password);
    }


    public void signup(RegisterRequest registerRequest) {
        Admin admin = new Admin();
        admin.setUsername(registerRequest.getUsername());
        admin.setPassword(encodePassword(registerRequest.getPassword()));
        adminRepository.save(admin);

    }


    // authentication process logic using auth manager
    public AuthenticationResponse login(LoginRequest loginRequest) {
        Authentication authenticate = authenticationManager.authenticate(
                // passing user credentials wrapped inside the UsernamepasswordAuthenticationToken class
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUserName(),
                        loginRequest.getPassword()
                )
        );
        // we can now be sure if the user is authenticated
        //  store the return type inside the spring security context
        SecurityContextHolder.getContext().setAuthentication(authenticate);
        String authenticationToken = jwtProvider.generateToken(authenticate);
        return new AuthenticationResponse(authenticationToken, loginRequest.getUserName());


    }

}
