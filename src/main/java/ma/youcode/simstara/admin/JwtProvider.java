package ma.youcode.simstara.admin;

import javax.annotation.PostConstruct;
import java.io.FileInputStream;
import java.io.IOException;
import java.security.*;
import java.security.cert.CertificateException;

public class JwtProvider {

    private KeyStore keyStore;
    private String secret = "password";

    @PostConstruct
    public void init() {
        try {
            keyStore  = KeyStore.getInstance(KeyStore.getDefaultType());
            keyStore.load(new FileInputStream("/home/boilerplate/Documents/Projects/firo/src/main/resources/springblog.jks"),
                    secret.toCharArray());
            Key key = keyStore.getKey("adminsDash", secret.toCharArray());

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
            return (PrivateKey) keyStore.getKey("springblog", secret.toCharArray());
        } catch (KeyStoreException | NoSuchAlgorithmException | UnrecoverableKeyException e) {
            throw new SpringBlogException("Exception occured while retrieving public key from keystore");
        }
    }

    public boolean validateToken(String jwt) {
        Jwts.parser().setSigningKey(getPublickey()).parseClaimsJws(jwt);
        return true;
    }

    private PublicKey getPublickey() {
        try {
            return keyStore.getCertificate("springblog").getPublicKey();
        } catch (KeyStoreException e) {
            throw new SpringBlogException("Exception occured while retrieving public key from keystore");
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
