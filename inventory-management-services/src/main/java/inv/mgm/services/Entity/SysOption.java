package inv.mgm.services.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class SysOption {
    @Id
    private Integer id;
    private String optionCode;
    private String optionValue;
    private String optionDesc;
    private String info1;
    private String info2;

    public SysOption(Integer id, String optionCode, String optionValue, String optionDesc, String info1, String info2) {
        this.id = id;
        this.optionCode = optionCode;
        this.optionValue = optionValue;
        this.optionDesc = optionDesc;
        this.info1 = info1;
        this.info2 = info2;
    }
    public SysOption() {
        // Default constructor
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getOptionCode() {
        return optionCode;
    }

    public void setOptionCode(String optionCode) {
        this.optionCode = optionCode;
    }

    public String getOptionValue() {
        return optionValue;
    }

    public void setOptionValue(String optionValue) {
        this.optionValue = optionValue;
    }

    public String getOptionDesc() {
        return optionDesc;
    }

    public void setOptionDesc(String optionDesc) {
        this.optionDesc = optionDesc;
    }

    public String getInfo1() {
        return info1;
    }

    public void setInfo1(String info1) {
        this.info1 = info1;
    }

    public String getInfo2() {
        return info2;
    }

    public void setInfo2(String info2) {
        this.info2 = info2;
    }
}
