package ma.youcode.simstara.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public class AdminDao {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public AdminDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    List<Admin> selectAllAdmins() {
        String sql = "" +
                "SELECT " +
                " admin_id, " +
                " username, " +
                " password, " +
                "FROM admin";

        return jdbcTemplate.query(sql, mapAdminFomDb());
    }

    String findByUserName(String username) {
        String sql = "" +
                "SELECT " +
                " admin_id, " +
                " username, " +
                " password, " +
                " FROM admin " +
                " WHERE username = ?" +
                ")";

        return jdbcTemplate.queryForObject(
                sql,
                new Object[]{username},
                (resultSet, i) -> resultSet.getString(username));
    }

    private RowMapper<Admin> mapAdminFomDb() {
        return (resultSet, i) -> {
            String adminIdStr = resultSet.getString("admin_id");
            UUID adminId = UUID.fromString(adminIdStr);
            String username = resultSet.getString("first_name");
            String password = resultSet.getString("last_name");
            return new Admin(
                    adminId,
                    username,
                    password
            );
        };
    }

}
