package inv.mgm.services.Repository;

import inv.mgm.services.Entity.Customer;
import inv.mgm.services.Entity.InventoryInfo;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {

    List<Customer> findAll();

    Optional<Customer> findById(Integer id);

    List<Customer> findByName(String name);

    List<Customer> findByEmail(String email);

    Customer findOneByPhone(String phone);

    List<Customer> findByAddress(String address);


}