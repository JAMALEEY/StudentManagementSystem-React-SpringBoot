package ma.youcode.simstara.admin.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import ma.youcode.simstara.admin.AdminsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.FileInputStream;
import java.io.IOException;
import java.security.*;
import java.security.cert.CertificateException;

@Service
public class JwtProvider {

    private KeyStore keyStore;
    private String secret = "password";

    @PostConstruct
    public void init() {
        try {
            keyStore  = KeyStore.getInstance(KeyStore.getDefaultType());
            keyStore.load(new FileInputStream("/home/boilerplate/Documents/Projects/simstara/src/main/resources/adminstudent.jks"),
                    secret.toCharArray());
            Key key = keyStore.getKey("adminstudent", secret.toCharArray());

        } catch (KeyStoreException | CertificateException | NoSuchAlgorithmException | IOException e) {
            throw new AdminsException("Exception occured while loading keystore");
        } catch (UnrecoverableKeyException e) {
            throw new RuntimeException(e);
        }

    }

    public String generateToken(Authentication authentication) {
        User principal = (User) authentication.getPrincipal();
        return Jwts.builder()
                .setSubject(principal.getUsername())
                .signWith(getPrivateKey())
                .compact();
    }



    private PrivateKey getPrivateKey() {
        try {
            return (PrivateKey) keyStore.getKey("adminstudent", secret.toCharArray());
        } catch (KeyStoreException | NoSuchAlgorithmException | UnrecoverableKeyException e) {
            throw new AdminsException("Exception occured while retrieving public key from keystore");
        }
    }

    public boolean validateToken(String jwt) {
        Jwts.parser().setSigningKey(getPublickey()).parseClaimsJws(jwt);
        return true;
    }

    private PublicKey getPublickey() {
        try {
            return keyStore.getCertificate("adminstudent").getPublicKey();
        } catch (KeyStoreException e) {
            throw new AdminsException("Exception occured while retrieving public key from keystore");
        }
    }

    public String getUsernameFromJWT(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(getPublickey())
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }
}
