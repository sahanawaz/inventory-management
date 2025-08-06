package inv.mgm.services.Service.impl;
import inv.mgm.services.Entity.InventoryInfo;
import inv.mgm.services.Model.InventoryStockModel;
import inv.mgm.services.Model.SkuFilterDto;
import inv.mgm.services.Model.StockDataModel;
import inv.mgm.services.Model.StockEntryModel;
import inv.mgm.services.Repository.InventoryRepository;
import inv.mgm.services.Service.InventoryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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
    public Map<String,List<InventoryStockModel>> getAllStocks(SkuFilterDto filterDto) {
        // Fetch all inventory stocks from the repository
//        .orElseThrow(() -> new RuntimeException("Product not found"))
        List<InventoryInfo> stocks = inventoryRepository.findInventoryWherePurchasedGreaterThanSold(
                filterDto.fromDt.orElse(LocalDate.now().minusDays(7)), filterDto.toDt.orElse(LocalDate.now())
        );

        Map<Object, List<InventoryInfo>> grp = stocks.parallelStream()
                .collect(Collectors.groupingBy(a->a.getCategory().getCategoryType().getOptionValue()));
        Map<String,List<InventoryStockModel>> mapData = new HashMap<>();
        for(Object key:grp.keySet()){
            List<InventoryStockModel> stockData = new ArrayList<>();
            grp.get(key).parallelStream().forEach(a -> {
                InventoryStockModel stockObj = new InventoryStockModel(
                        a.getInventory().getInventoryType().getOptionValue(),
                        a.getCategory().getCategoryType().getOptionValue(),
                        a.getInventorySku(),
                        a.getCategory().getColor().getOptionValue(),
                        a.getCategory().getDimension().getOptionValue(),
                        a.getInventory().getUnitCp(),
                        a.getInventory().getUnitSp(),
                        a.getPurchasedQuantity(),
                        a.getSoldQuantity(),
                        (a.getPurchasedQuantity() - a.getSoldQuantity()),
                        a.getInventory().getDate().getDayOfMonth()+"/"+a.getInventory().getDate().getMonthValue()+"/"+a.getInventory().getDate().getYear(),
                        a.getInventory().getInventoryDesc()
                );
                stockData.add(stockObj);
            });
            mapData.put(key.toString(),stockData);
        }
        return mapData;
    }

    @Override
    public List<InventoryStockModel> getAllStocksByDateRange(SkuFilterDto filterDto) {
        List<InventoryInfo> stocks = inventoryRepository.findInventoryWherePurchasedGreaterThanSold(
                filterDto.fromDt.orElse(LocalDate.now().minusDays(7)), filterDto.toDt.orElse(LocalDate.now())
        );
        return stocks.parallelStream().map(a -> new InventoryStockModel(
                a.getInventory().getInventoryType().getOptionValue(),
                a.getCategory().getCategoryType().getOptionValue(),
                a.getInventorySku(),
                a.getCategory().getColor().getOptionValue(),
                a.getCategory().getDimension().getOptionValue(),
                a.getInventory().getUnitCp(),
                a.getInventory().getUnitSp(),
                a.getPurchasedQuantity(),
                a.getSoldQuantity(),
                (a.getPurchasedQuantity() - a.getSoldQuantity()),
                a.getInventory().getDate().getDayOfMonth()+"/"+a.getInventory().getDate().getMonthValue()+"/"+a.getInventory().getDate().getYear(),
                a.getInventory().getInventoryDesc())).toList();
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
     * @param stockDataModels
     * @return
     */
    @Override
    public List<String> createStock(Integer userId, List<StockEntryModel> stockDataModels) {
        validateStockModel(stockDataModels);
        String stockStr = stockDataModels.toString();
        logger.info("InventoryService.createStock ---> userId: {}, stockDataModel: {}", userId, stockStr);

        return inventoryRepository.saveInventory(userId, stockStr);
    }

    @Override
    public void validateStockModel(List<StockEntryModel> modelList){
        modelList.forEach(model -> {
            if(Objects.nonNull(model.getColor()) && model.getColor() == 0 )
                model.setColor(null);
            else if (Objects.nonNull(model.getDimension()) && model.getDimension() == 0 ) {
                model.setDimension(null);
            } else if (Objects.nonNull(model.getCategoryType()) && model.getCategoryType() == 0 ) {
                model.setCategoryType(null);
            }
        });
    }

}
