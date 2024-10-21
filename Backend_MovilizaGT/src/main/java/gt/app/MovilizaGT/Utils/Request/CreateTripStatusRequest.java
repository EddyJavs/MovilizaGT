package gt.app.MovilizaGT.Utils.Request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class CreateTripStatusRequest {

    @JsonProperty("estado")
    private String estado;

    @JsonProperty("precio")
    private BigDecimal precio; // Precio puede ser opcional, así que Double es nullable

    @JsonProperty("viajeId")
    private Integer viajeId;
}
