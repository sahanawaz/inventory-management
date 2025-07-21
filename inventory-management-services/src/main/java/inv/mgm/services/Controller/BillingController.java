package inv.mgm.services.Controller;

import inv.mgm.services.Model.CustomerBillModel;
import inv.mgm.services.Service.BillingService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BillingController {
    private static final Logger logger = LoggerFactory.getLogger(BillingController.class);
    @Autowired
    BillingService billingService;

    @PostMapping("/createBill")
        public ResponseEntity<String> createBill(@RequestBody CustomerBillModel customerBill) {
            try {
                logger.info("Received bill for customer: {}", customerBill.getCustomerId());
                billingService.processBill(customerBill);
                return ResponseEntity.ok("Bill processed successfully");
            } catch (Exception e) {
                logger.error("Error processing bill: ", e);
                return ResponseEntity.status(500).body("Failed to process bill: " + e.getMessage());
            }
        }

}
