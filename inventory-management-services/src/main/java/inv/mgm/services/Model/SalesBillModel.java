package inv.mgm.services.Model;

import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Setter
public class SalesBillModel {
    private Integer id;
    private CustomerBillModel customer;
    private List<BillModel> billArr;
    private Double discount;
    private Double extraCharges;

}
