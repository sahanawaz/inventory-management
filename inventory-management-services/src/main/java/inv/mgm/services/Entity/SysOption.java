package inv.mgm.services.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@ToString
public class SysOption {
    @Id
    private Integer id;
    private String optionCode;
    private String optionValue;
    private String optionDesc;
    private String info1;
    private String info2;

}
