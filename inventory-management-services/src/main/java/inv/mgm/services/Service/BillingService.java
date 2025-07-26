package inv.mgm.services.Service;

import inv.mgm.services.Entity.Ledger;
import inv.mgm.services.Model.SalesBillModel;

import java.time.LocalDate;
import java.util.List;


public interface BillingService {
    Ledger processBill(SalesBillModel billModel);
    List<Ledger> findAllBillsBetweenDateRange(LocalDate startDt, LocalDate endDt);
}
