package inv.mgm.services.Service;
import inv.mgm.services.Entity.InventoryInfo;
import inv.mgm.services.Model.StockDataModel;
import inv.mgm.services.Repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InventoryServiceImpl implements InventoryService{
    @Autowired
    InventoryRepository inventoryRepository;
    /**
     * @return
     */
    @Override
    public List<InventoryInfo> getAllStocks() {
        // Fetch all inventory stocks from the repository
//        .orElseThrow(() -> new RuntimeException("Product not found"))
        return inventoryRepository.findAll();
    }

    /**
     * @param sku
     * @return
     */
    @Override
    public List<StockDataModel> getStockBySku(String sku) {
        InventoryInfo invt = inventoryRepository.findByInventorySku(sku).get(0);
        StockDataModel model = new StockDataModel(invt.getId(),invt.getInventorySku(),
                invt.getInventory().getInventoryDesc(),(invt.getPurchasedQuantity() - invt.getSoldQuantity()),invt.getInventory().getUnitCp(),invt.getInventory().getUnitSp(),0.0);
        return List.of(model);
    }


}
