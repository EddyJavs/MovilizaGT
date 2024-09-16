package gt.app.MovilizaGT.entity;

import lombok.Data;

import javax.persistence.*;
import java.sql.Time;

@Entity
@Table(name = "stand")
@Data
public class Stand {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer standId;

    @Column(name = "stopPoint")
    private String stopPoint;

    @Column(name = "correlative")
    private Integer correlative;

    @Column(name = "departureTime")
    private Time departureTime;

    @ManyToOne
    @JoinColumn(name = "FK_routeId", referencedColumnName = "routeId")
    private Route route;
}
