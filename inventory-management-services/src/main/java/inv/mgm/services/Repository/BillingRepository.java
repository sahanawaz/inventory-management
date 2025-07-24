package inv.mgm.services.Repository;


import inv.mgm.services.Entity.Leadger;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BillingRepository extends JpaRepository<Leadger, Long> {

    // Define custom query methods if needed
    // For example, find by billing date or customer ID
    // List<Billing> findByBillingDate(Date billingDate);
    // List<Billing> findByCustomerId(Long customerId);
    // Inherited from JpaRepository: List<BillingRepository> findAll();
    @Transactional // Ensure transactional context for modification
    @Query(value = "select * from saveBill(:billModel)", nativeQuery = true)
    int createBill(@Param("billModel") String billModel);



}
