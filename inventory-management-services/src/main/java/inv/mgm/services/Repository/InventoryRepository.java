package inv.mgm.services.Repository;

import inv.mgm.services.Entity.Inventory;
import inv.mgm.services.Entity.InventoryInfo;
import inv.mgm.services.Model.InventorySummaryResp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface InventoryRepository extends JpaRepository<InventoryInfo, Long> {
    // Define custom query methods if needed
    // For example, find by item name or category

     List<InventoryInfo> findAll();
     List<InventoryInfo> findByInventorySku(String inventorySku);

     @Query(value = "SELECT sku FROM fn_inventory_save(:userId, :inventoryData ::JSONB)",nativeQuery = true)
      List<String> saveInventory(@Param("userId") Integer userId,
                                       @Param("inventoryData") String inventoryData);
    @Query("""
       SELECT i FROM InventoryInfo i
       WHERE i.purchasedQuantity >= i.soldQuantity
        AND i.inventorySku = COALESCE(:sku, i.inventorySku)
        AND i.inventory.date BETWEEN :fromDt AND :toDt ORDER BY i.id DESC    
    """)
    List<InventoryInfo> findInventoryWherePurchasedGreaterThanSold(
            @Param("fromDt") LocalDate fromDt, @Param("toDt") LocalDate toDt, @Param("sku") String sku);

    @Query(value = """
            SELECT
            	SUM(ii.purchased_quantity) total_qty,
            	SUM(ii.sold_quantity) sold_qty
            FROM inventory_info  ii
            """, nativeQuery = true)
    InventorySummaryResp getInventorySummary();


}
