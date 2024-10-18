package gt.app.MovilizaGT.entity;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "rating")
@Data
public class Qualification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer ratingId;

    @Column(name = "score")
    private Integer score;

    @Column(name = "message")
    private String message;

    @ManyToOne
    @JoinColumn(name = "FK_userId1", referencedColumnName = "userId")
    private Person user1;  // El usuario que está calificando

    @ManyToOne
    @JoinColumn(name = "FK_userId2", referencedColumnName = "userId")
    private Person user2;  // El usuario que está siendo calificado

    @ManyToOne
    @JoinColumn(name = "FK_tripId", referencedColumnName = "tripId")
    private Trip trip;
}
