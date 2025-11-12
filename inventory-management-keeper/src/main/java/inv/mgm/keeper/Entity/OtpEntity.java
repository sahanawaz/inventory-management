package inv.mgm.keeper.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;
import org.springframework.web.service.annotation.GetExchange;

import java.time.LocalDateTime;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class OtpEntity {
    @Id
    private Long id;

    @Column
    private String phoneNo;
    @Column
    private LocalDateTime expiryTime;
    @Column
    private String code;
}
