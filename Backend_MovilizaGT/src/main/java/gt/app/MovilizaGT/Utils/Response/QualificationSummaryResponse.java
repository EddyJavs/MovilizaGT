package gt.app.MovilizaGT.Utils.Response;

import gt.app.MovilizaGT.entity.Qualification;
import lombok.Data;

import java.util.List;

@Data
public class QualificationSummaryResponse {
    private List<Qualification> qualifications;
    private double averageScore;
}
