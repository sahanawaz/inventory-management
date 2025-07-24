package inv.mgm.services.Service;

import inv.mgm.services.Model.CustomerBillModel;
import inv.mgm.services.Model.SalesBillModel;
import org.springframework.stereotype.Service;


public interface BillingService {
    Integer processBill(SalesBillModel billModel);
}
