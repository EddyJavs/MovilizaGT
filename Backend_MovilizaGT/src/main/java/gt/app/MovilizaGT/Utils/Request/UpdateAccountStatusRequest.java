package gt.app.MovilizaGT.Utils.Request;

import com.fasterxml.jackson.annotation.JsonProperty;
import gt.app.MovilizaGT.entity.Person;
import lombok.Data;

import java.sql.Time;
import java.sql.Date;
import java.util.List;

@Data
public class CreateRouteRequest {
    private Time departureTime;
    private Date departureDate;
    private Integer availableSeats;

    @JsonProperty("FK_userId")
    private Integer FK_userId;
    private List<CreateStandRequest> stands;
}
