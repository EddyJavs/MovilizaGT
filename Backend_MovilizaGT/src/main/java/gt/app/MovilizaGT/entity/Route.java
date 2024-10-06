package gt.app.MovilizaGT.entity;

import lombok.Data;

import javax.persistence.*;
import java.sql.Time;
import java.sql.Date;

@Entity
@Table(name = "route")
@Data
public class Route {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer routeId;

    @Column(name = "departureTime")
    private Time departureTime;

    @Column(name = "departureDate")
    private Date departureDate;

    @Column(name = "availableSeats")
    private Integer availableSeats;

    @ManyToOne
    @JoinColumn(name = "FK_userId", referencedColumnName = "userId")
    private Person person;
}
