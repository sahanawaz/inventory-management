package inv.mgm.services.Service;

import inv.mgm.services.Model.CustomerBillModel;
import inv.mgm.services.Model.SalesBillModel;
import inv.mgm.services.Repository.BillingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BillingServiceImpl implements BillingService{

    @Autowired
    BillingRepository billingRepository;
    @Override
    public Integer processBill(SalesBillModel billModel) {
        return billingRepository.createBill(billModel.jsonString());
    }
}
