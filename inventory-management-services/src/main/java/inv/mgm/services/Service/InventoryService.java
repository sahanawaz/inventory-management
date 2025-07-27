package inv.mgm.services.Service;

import inv.mgm.services.Entity.Inventory;
import inv.mgm.services.Entity.InventoryInfo;
import inv.mgm.services.Model.StockDataModel;
import inv.mgm.services.Model.StockEntryModel;
import inv.mgm.services.Model.StocksModel;
import org.springframework.stereotype.Service;

import java.util.List;


public interface InventoryService {
    List<InventoryInfo> getAllStocks();

    List<StockDataModel> getStockBySku(String sku);

    List<String> createStock(Integer userId,StockEntryModel stockDataModel);
}
