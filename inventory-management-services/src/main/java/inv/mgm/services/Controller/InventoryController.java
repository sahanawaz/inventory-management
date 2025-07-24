package inv.mgm.services.Controller;

import inv.mgm.services.Entity.Inventory;
import inv.mgm.services.Entity.InventoryInfo;
import inv.mgm.services.Model.StockDataModel;
import inv.mgm.services.Model.StocksModel;
import inv.mgm.services.Service.InventoryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;

@RestController
public class InventoryController {
    private static final Logger logger = LoggerFactory.getLogger(InventoryController.class);
    @Autowired
    InventoryService inventoryService;

    /**
         * Retrieves all inventory stocks.
         *
         * @return a list of all inventory stocks
         */
    @GetMapping("/getStocks")
        public ResponseEntity<List<InventoryInfo>> getAllStocks() {
            try {
                List<InventoryInfo> stocks = inventoryService.getAllStocks();
                return ResponseEntity.ok(stocks);
            } catch (Exception e) {
                logger.error("Error fetching stocks", e);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
            }
        }

    @GetMapping("/getStockBySku")
    public ResponseEntity<List<StockDataModel>> getStockBySku(@RequestParam String sku) {
        try {
            List<StockDataModel> stocks = inventoryService.getStockBySku(sku);
            return ResponseEntity.ok(stocks);
        } catch (Exception e) {
            logger.error("Error fetching stocks", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
        }
    }
}
