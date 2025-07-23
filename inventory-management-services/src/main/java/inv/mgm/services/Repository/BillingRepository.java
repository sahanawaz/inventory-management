package inv.mgm.services.Repository;


import inv.mgm.services.Entity.Leadger;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BillingRepository extends JpaRepository<Leadger, Long> {

    // Define custom query methods if needed
    // For example, find by billing date or customer ID
    // List<Billing> findByBillingDate(Date billingDate);
    // List<Billing> findByCustomerId(Long customerId);
    // Inherited from JpaRepository: List<BillingRepository> findAll();



}
