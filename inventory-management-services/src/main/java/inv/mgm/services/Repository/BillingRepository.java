package inv.mgm.services.Repository;


import inv.mgm.services.Entity.Ledger;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface BillingRepository extends JpaRepository<Ledger, Long> {
    List<Ledger> findByBillDateBetween(LocalDate startDt, LocalDate endDt);


}
