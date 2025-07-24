package inv.mgm.services.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class SysOption {
    @Id
    private Integer id;
    private String optionCode;
    private String optionValue;
    private String optionDesc;
    private String info1;
    private String info2;

}
