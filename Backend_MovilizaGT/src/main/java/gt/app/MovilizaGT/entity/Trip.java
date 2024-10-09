package gt.app.MovilizaGT.entity;

import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "trip")
@Data
public class Trip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer tripId;

    @Column(name = "agreedPrice", precision = 10, scale = 2)
    private BigDecimal agreedPrice = BigDecimal.ZERO;

    @Column(name = "startPoints")
    private String startPoints; // Tratamos el punto como String

    @Column(name = "endPoints")
    private String endPoints;

    @Column(name = "statusTrip")
    private String statusTrip = "pendiente";

    @Column(name = "acceptedAt")
    private LocalDateTime acceptedAt = LocalDateTime.of(1970, 1, 1, 0, 0, 0);

    @Column(name = "createdAt")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "neededSeats")
    private Integer neededSeats;

    @Column(name = "tripStart")
    private LocalDateTime tripStart;

    @Column(name = "tripEnd")
    private LocalDateTime tripEnd;

    @ManyToOne
    @JoinColumn(name = "FK_userId", referencedColumnName = "userId")
    private Person user;

    @ManyToOne
    @JoinColumn(name = "FK_routeId", referencedColumnName = "routeId")
    private Route route;
}
