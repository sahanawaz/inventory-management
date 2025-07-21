package inv.mgm.services.Service;

import inv.mgm.services.Model.CustomerBillModel;
import org.springframework.stereotype.Service;

@Service
public interface BillingService {
    void processBill(CustomerBillModel customerBill);
}
