package inv.mgm.services.Repository;


import inv.mgm.services.Entity.Ledger;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface BillingRepository extends JpaRepository<Ledger, Long> {
    List<Ledger> findByBillDateBetween(LocalDate startDt, LocalDate endDt);

    // Define custom query methods if needed
    // For example, find by billing date or customer ID
    // List<Billing> findByBillingDate(Date billingDate);
    // List<Billing> findByCustomerId(Long customerId);
    // Inherited from JpaRepository: List<BillingRepository> findAll();
//    @Transactional // Ensure transactional context for modification
//    @Query(value = "select * from saveBill(:billModel)", nativeQuery = true)
//    int createBill(@Param("billModel") String billModel);



}
