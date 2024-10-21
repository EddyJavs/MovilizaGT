package gt.app.MovilizaGT.Utils.Request;

import lombok.Data;

@Data
public class UpdateAccountStatusRequest {
    private Integer userId;
    private Integer accountStatus;
}
