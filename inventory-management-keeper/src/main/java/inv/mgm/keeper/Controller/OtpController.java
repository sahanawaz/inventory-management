package inv.mgm.keeper.Controller;

import inv.mgm.keeper.JwtConfig.JwtUtil;
import inv.mgm.keeper.Service.OtpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/otp")
public class OtpController {

    @Autowired
    private OtpService otpService;
    @Autowired
    private JwtUtil jwtUtil;
    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOtp(@RequestBody Map<String, String> request) {
        otpService.generateOtp(request.get("mobile"));
        return ResponseEntity.ok("OTP sent");
    }
    @PostMapping("/verify")
    public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> request) {
        String mobile = request.get("mobile");
        String code = request.get("otp");
        if (otpService.validateOtp(mobile, code)) {
            return ResponseEntity.ok(Map.of("token", jwtUtil.generateToken(mobile)));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid OTP");
        }
    }
}
