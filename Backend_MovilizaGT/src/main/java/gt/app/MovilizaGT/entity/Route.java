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
    private Time departureTime;  // Cambiado a java.sql.Time

    @Column(name = "departureDate")
    private Date departureDate;  // Cambiado a java.sql.Date

    @Column(name = "availableSeats")
    private Integer availableSeats;

    @ManyToOne  // Definimos la relación con Person
    @JoinColumn(name = "FK_userId", referencedColumnName = "userId")  // Se mapea FK_userId con userId de Person
    private Person person;  // Aquí referenciamos a la entidad Person
}
