package gt.app.MovilizaGT.entity;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "person")
@Data
public class Person {

    @Id
    @Column(name = "userId")
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Indicamos que el valor se generará en la base de datos.
    private Integer userId;

    @Column(name = "email")
    private String email;

    @Column(name = "fullName")
    private String fullName;

    @Column(name = "phone")
    private String phone;

    @Column(name = "dpi")
    private String dpi;

    @Column(name = "gender")
    private String gender;

    @Column(name = "age")
    private Integer age;

    @Column(name = "pass")
    private String pass;

    @Column(name = "dpiFront")
    private String dpiFront;

    @Column(name = "dpiBack")
    private String dpiBack;

    @Column(name = "licenseFront")
    private String licenseFront;

    @Column(name = "licenseBack")
    private String licenseBack;

    @Column(name = "photo")
    private String photo;

    @Column(name = "createdAt")
    private LocalDateTime createdAt;

}
