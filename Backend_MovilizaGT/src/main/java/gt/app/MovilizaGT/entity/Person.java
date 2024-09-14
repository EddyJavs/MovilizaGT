package gt.app.MovilizaGT.entity;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "Person")
@Data
public class Person {

    @Id
    private Integer UserId;

    private String email;

    private String fullName;

    private String phone;

    private String dpi;

    private String gender;

    private Integer age;

    private String pass;

    private String dpiFront;

    private String dpiBack;

    private String licenceFront;

    private String licenceBack;

    private String photo;

    private LocalDateTime createdAt;

}
