package inv.mgm.services.Model;

public class SysOptionModel {
    private Integer id;
    private String optionCode;
    private String optionValue;

    public SysOptionModel(Integer id, String optionCode, String optionValue) {
        this.id = id;
        this.optionCode = optionCode;
        this.optionValue = optionValue;
    }
    public SysOptionModel() {
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
}
