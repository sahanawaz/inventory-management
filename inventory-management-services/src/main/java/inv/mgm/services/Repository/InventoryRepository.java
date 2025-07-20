package inv.mgm.services.Repository;

import inv.mgm.services.Entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {
    // Define custom query methods if needed
    // For example, find by item name or category
    // List<Inventory> findByItemName(String itemName);
    // List<Inventory> findByCategory(String category);
}
