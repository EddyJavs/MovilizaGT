package gt.app.MovilizaGT.Utils.Request;

import lombok.Data;
import java.util.List;

@Data
public class CreateRouteRequest {
    private String departureTime;
    private String departureDate;
    private Integer availableSeats;
    private Integer FK_userId;
    private List<CreateStandRequest> stands;

}

