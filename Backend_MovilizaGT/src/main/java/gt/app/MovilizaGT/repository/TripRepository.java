package gt.app.MovilizaGT.repository;

import gt.app.MovilizaGT.entity.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.sql.Time;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TripRepository extends JpaRepository<Trip, Integer> {

    @Modifying
    @Query(value = "INSERT INTO trip (startPoints, endPoints, agreedPrice, statusTrip, acceptedAt, createdAt, neededSeats, tripStart, tripEnd, FK_userId, FK_routeId) " +
            "VALUES (POINT(:startLat, :startLon), POINT(:endLat, :endLon), :agreedPrice, :statusTrip, :acceptedAt, :createdAt, :neededSeats, :tripStart, :tripEnd, :userId, :routeId)",
            nativeQuery = true)
    void saveTrip(@Param("startLat") double startLat,
                  @Param("startLon") double startLon,
                  @Param("endLat") double endLat,
                  @Param("endLon") double endLon,
                  @Param("agreedPrice") BigDecimal agreedPrice,
                  @Param("statusTrip") String statusTrip,
                  @Param("acceptedAt") LocalDateTime acceptedAt,
                  @Param("createdAt") LocalDateTime createdAt,
                  @Param("neededSeats") int neededSeats,
                  @Param("tripStart") LocalDateTime tripStart,
                  @Param("tripEnd") LocalDateTime tripEnd,
                  @Param("userId") int userId,
                  @Param("routeId") int routeId);


    @Query(value = "SELECT t.* FROM trip t " +
            "JOIN route r ON t.FK_routeId = r.routeId " +
            "WHERE r.FK_userId = :userIdCreator", nativeQuery = true)
    List<Trip> findTripsByRouteCreator(@Param("userIdCreator") Integer userIdCreator);



}
