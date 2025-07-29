package inv.mgm.services.Service.impl;
import inv.mgm.services.Entity.InventoryCategory;
import inv.mgm.services.Entity.InventoryInfo;
import inv.mgm.services.Model.InventoryStockModel;
import inv.mgm.services.Model.StockDataModel;
import inv.mgm.services.Model.StockEntryModel;
import inv.mgm.services.Repository.InventoryRepository;
import inv.mgm.services.Service.InventoryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class InventoryServiceImpl implements InventoryService {
    private final Logger logger = LoggerFactory.getLogger(InventoryServiceImpl.class);
    @Autowired
    InventoryRepository inventoryRepository;
    /**
     * @return
     */
    @Override
    public Map<String,List<InventoryStockModel>> getAllStocks() {
        // Fetch all inventory stocks from the repository
//        .orElseThrow(() -> new RuntimeException("Product not found"))
        List<InventoryInfo> stocks = inventoryRepository.findInventoryWherePurchasedGreaterThanSold();
        Map<Object, List<InventoryInfo>> grp = stocks.parallelStream()
                .collect(Collectors.groupingBy(a->a.getCategory().getCategoryType().getOptionValue()));
        Map<String,List<InventoryStockModel>> mapData = new HashMap<>();
        for(Object key:grp.keySet()){
            List<InventoryStockModel> stockData = new ArrayList<>();
            grp.get(key).parallelStream().forEach(a -> {
                InventoryStockModel stockObj = new InventoryStockModel(
                        a.getInventory().getInventoryType().getOptionValue(),
                        a.getInventorySku(),
                        a.getCategory().getColor().getOptionValue(),
                        a.getCategory().getDimension().getOptionValue(),
                        a.getInventory().getUnitCp(),
                        a.getInventory().getUnitSp(),
                        (a.getPurchasedQuantity() - a.getSoldQuantity()),
                        a.getInventory().getDate().getDayOfMonth()+"/"+a.getInventory().getDate().getMonthValue()+"/"+a.getInventory().getDate().getYear()
                );
                stockData.add(stockObj);
            });
            mapData.put(key.toString(),stockData);
        }
        return mapData;
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
