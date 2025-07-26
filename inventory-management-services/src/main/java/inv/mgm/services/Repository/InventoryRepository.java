package inv.mgm.services.Repository;

import inv.mgm.services.Entity.Inventory;
import inv.mgm.services.Entity.InventoryInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface InventoryRepository extends JpaRepository<InventoryInfo, Long> {
    // Define custom query methods if needed
    // For example, find by item name or category

     List<InventoryInfo> findAll();
     List<InventoryInfo> findByInventorySku(String inventorySku);

     @Query(value = "SELECT sku FROM fn_inventory_save(:userId, :inventoryData ::JSONB)",nativeQuery = true)
      List<String> saveInventory(@Param("userId") Integer userId,
                                       @Param("inventoryData") String inventoryData);

}
