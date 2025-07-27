package inv.mgm.services.Service.impl;
import inv.mgm.services.Entity.InventoryInfo;
import inv.mgm.services.Model.StockDataModel;
import inv.mgm.services.Model.StockEntryModel;
import inv.mgm.services.Repository.InventoryRepository;
import inv.mgm.services.Service.InventoryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class InventoryServiceImpl implements InventoryService {
    private final Logger logger = LoggerFactory.getLogger(InventoryServiceImpl.class);
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
        logger.info("InventoryService.getStockBySku ---> START");
        InventoryInfo invt = inventoryRepository.findByInventorySku(sku).get(0);
        StockDataModel model = new StockDataModel(invt.getId(),invt.getInventorySku(),
                invt.getInventory().getInventoryDesc(),(invt.getPurchasedQuantity() - invt.getSoldQuantity()),invt.getInventory().getUnitCp(),invt.getInventory().getUnitSp(),0.0);
        return List.of(model);
    }

    /**
     * @param stockDataModel
     * @return
     */
    @Override
    public List<String> createStock(Integer userId, StockEntryModel stockDataModel) {
        List<StockEntryModel> stockEntryModels = new ArrayList<>();
        stockEntryModels.add(stockDataModel);
        String stockStr = stockEntryModels.toString();
        logger.info("InventoryService.createStock ---> userId: {}, stockDataModel: {}", userId, stockStr);

        return inventoryRepository.saveInventory(userId, stockStr);
    }


}
