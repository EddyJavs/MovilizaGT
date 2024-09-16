package gt.app.MovilizaGT.repository;

import gt.app.MovilizaGT.entity.Stand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.sql.Time;

@Repository
public interface StandRepository extends JpaRepository<Stand, Integer> {

    @Modifying
    @Query(value = "INSERT INTO stand (stopPoint, correlative, departureTime, FK_routeId) " +
            "VALUES (POINT(:latitude, :longitude), :correlative, :departureTime, :routeId)", nativeQuery = true)
    void saveStand(@Param("latitude") double latitude,
                   @Param("longitude") double longitude,
                   @Param("correlative") int correlative,
                   @Param("departureTime") Time departureTime,
                   @Param("routeId") int routeId);

}
