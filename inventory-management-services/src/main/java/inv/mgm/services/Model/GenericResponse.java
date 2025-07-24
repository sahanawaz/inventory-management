package inv.mgm.services.Model;

import lombok.Builder;

@Builder
public class GenericResponse {
    public Integer respCode;
    public String respMesaage;
    public Object respData;
}
