package inv.mgm.services.Service;

import inv.mgm.services.Entity.Inventory;
import inv.mgm.services.Entity.InventoryInfo;
import inv.mgm.services.Model.StocksModel;
import org.springframework.stereotype.Service;

import java.util.List;


public interface InventoryService {
    List<InventoryInfo> getAllStocks();

    List<InventoryInfo> getStockBySku(String sku);
}
