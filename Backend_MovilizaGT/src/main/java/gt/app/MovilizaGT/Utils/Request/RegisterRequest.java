package gt.app.MovilizaGT.Utils.Request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data


public class RegisterRequest {
    private String email;
    private String fullName;
    private String phone;
    private String dpi;
    private String gender;
    private Integer age;
    private String pass;
    private MultipartFile licenseFront;
    private MultipartFile licenseBack;
    private MultipartFile dpiFront;
    private MultipartFile dpiBack;
    private MultipartFile photo;

    // Getters y setters
}


