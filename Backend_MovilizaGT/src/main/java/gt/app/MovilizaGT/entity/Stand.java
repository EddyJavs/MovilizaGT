package gt.app.MovilizaGT.entity;

import lombok.Data;
import org.hibernate.annotations.Type;
import org.locationtech.jts.geom.Point;

import javax.persistence.*;

@Entity
@Table(name = "stand")
@Data
public class Stand {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer standId;

    @Column(name = "stopPoint", columnDefinition = "POINT")
    @Type(type = "org.hibernate.spatial.GeometryType")
    private Point stopPoint; // Usamos Point de JTS

    @Column(name = "correlative")
    private Integer correlative;

    @Column(name = "departureTime")
    private String departureTime;

    @Column(name = "FK_routeId")
    private Integer FK_routeId;
}
