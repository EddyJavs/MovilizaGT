package gt.app.MovilizaGT.Utils.Request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class QualificationRequest {

    @JsonProperty("score")
    private Integer score;

    @JsonProperty("message")
    private String message;

    @JsonProperty("FK_userId1")
    private Integer FK_userId1;

    @JsonProperty("FK_userId2")
    private Integer FK_userId2;

    @JsonProperty("FK_tripId")
    private Integer FK_tripId;
}
