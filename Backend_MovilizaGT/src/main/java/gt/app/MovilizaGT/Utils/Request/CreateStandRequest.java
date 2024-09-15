package gt.app.MovilizaGT.Utils.Request;

import lombok.Data;

@Data
public class CreateStandRequest {
    private double latitude;   // Latitud
    private double longitude;  // Longitud
    private Integer correlative;
    private String departureTime;
}
