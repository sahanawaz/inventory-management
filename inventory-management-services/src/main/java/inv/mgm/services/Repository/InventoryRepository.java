package inv.mgm.services.Repository;

import inv.mgm.services.Entity.Inventory;
import inv.mgm.services.Entity.InventoryInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InventoryRepository extends JpaRepository<InventoryInfo, Long> {
    // Define custom query methods if needed
    // For example, find by item name or category

     List<InventoryInfo> findAll();
     List<InventoryInfo> findByInventorySku(String inventorySku);
}
