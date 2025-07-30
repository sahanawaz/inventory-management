package inv.mgm.services.Service;

import inv.mgm.services.Entity.Inventory;
import inv.mgm.services.Entity.InventoryInfo;
import inv.mgm.services.Model.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;


public interface InventoryService {
    Map<String,List<InventoryStockModel>> getAllStocks(SkuFilterDto filterDto);
    List<InventoryStockModel> getAllStocksByDateRange(SkuFilterDto filterDto);

    List<StockDataModel> getStockBySku(String sku);

    List<String> createStock(Integer userId,StockEntryModel stockDataModel);
}
