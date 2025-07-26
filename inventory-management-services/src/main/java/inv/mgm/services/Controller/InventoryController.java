package inv.mgm.services.Controller;

import inv.mgm.services.Model.GenericResponse;
import inv.mgm.services.Model.StockDataModel;
import inv.mgm.services.Service.InventoryService;
import inv.mgm.services.utils.Constants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;

@RestController
@CrossOrigin("*")
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
        public ResponseEntity<GenericResponse> getAllStocks() {
            try {
                return ResponseEntity.ok(GenericResponse.builder()
                                .respCode(HttpStatus.OK.value())
                                .respMesaage("SUC")
                                .respData(inventoryService.getAllStocks())
                        .build());
            } catch (Exception e) {
                logger.error("Error fetching stocks", e);
                return ResponseEntity.ok(GenericResponse.builder()
                                .respCode(HttpStatus.INTERNAL_SERVER_ERROR.value())
                                .respMesaage(Constants.SYS_ERR_MSG)
                        .build());
            }
        }

    @GetMapping("/getStockBySku")
    public ResponseEntity<GenericResponse> getStockBySku(@RequestParam String sku) {
        try {
            return ResponseEntity.ok(GenericResponse.builder()
                            .respCode(HttpStatus.OK.value())
                            .respMesaage("SUC")
                            .respData(inventoryService.getStockBySku(sku))
                    .build());
        } catch (Exception e) {
            logger.error("Error fetching stocks", e);
            return ResponseEntity.ok(GenericResponse.builder()
                            .respCode(HttpStatus.INTERNAL_SERVER_ERROR.value())
                            .respMesaage(Constants.SYS_ERR_MSG)
                    .build());
        }
    }
}
