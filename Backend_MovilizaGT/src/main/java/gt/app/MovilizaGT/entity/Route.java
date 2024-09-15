package gt.app.MovilizaGT.entity;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "route")
@Data
public class Route {

    @Id
    @Column(name = "routeId")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer routeId;

    @Column(name = "departureTime")
    private String departureTime;

    @Column(name = "departureDate")
    private String departureDate;

    @Column(name = "availableSeats")
    private String availableSeats;

    @Column(name = "FK_userId")
    private String FK_userId;

}
