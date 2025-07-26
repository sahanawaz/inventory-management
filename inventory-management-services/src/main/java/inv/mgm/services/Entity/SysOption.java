package inv.mgm.services.Entity;

import com.fasterxml.jackson.annotation.JsonProperty;
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
    @JsonProperty("key")
    private Integer id;
    @JsonProperty("code")
    private String optionCode;
    @JsonProperty("value")
    private String optionValue;
    @JsonProperty("desc")
    private String optionDesc;
    private String info1;
    private String info2;

}
