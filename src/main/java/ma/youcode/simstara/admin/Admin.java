package ma.youcode.simstara.admin;

import javax.validation.constraints.NotBlank;
import java.util.UUID;

public class Admin {
    private final UUID adminId;
    @NotBlank
    private final String username;
    @NotBlank
    public final String password;

    public Admin(UUID adminId, String username, String password) {
        this.adminId = adminId;
        this.username = username;
        this.password = password;
    }


    public UUID getAdminId() {
        return adminId;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    // WE HAVE NO SETTERS BECAUSE WE USED FINAL VARIABLES !!!!




}
