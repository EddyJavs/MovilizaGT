package gt.app.MovilizaGT.Utils.Request;

import lombok.Data;

import java.math.BigDecimal;
import java.sql.Time;

@Data
public class CreateStandRequest {
    private double latitude;
    private double longitude;
    private Integer correlative;
    private Time departureTime;
}
