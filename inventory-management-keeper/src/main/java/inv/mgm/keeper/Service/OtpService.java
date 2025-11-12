package inv.mgm.keeper.Service;

import inv.mgm.keeper.Entity.OtpEntity;
import inv.mgm.keeper.Repository.OtpRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
public class OtpService {

    @Autowired
    private OtpRepository otpRepo;

    public void generateOtp(String phoneNo) {
        String otp = String.valueOf(new Random().nextInt(900000) + 100000);
        OtpEntity otpEntity = new OtpEntity();
        otpEntity.setPhoneNo(phoneNo);
        otpEntity.setCode(otp);
        otpEntity.setExpiryTime(LocalDateTime.now().plusMinutes(5));
        otpRepo.save(otpEntity);
        System.out.println("Generated OTP: " + otp); // replace with SMS API
    }

    public boolean validateOtp(String phoneNo, String code) {
        return otpRepo.findById(Long.valueOf(phoneNo))
                .filter(o -> o.getCode().equals(code) && o.getExpiryTime().isAfter(LocalDateTime.now()))
                .isPresent();
    }
}
