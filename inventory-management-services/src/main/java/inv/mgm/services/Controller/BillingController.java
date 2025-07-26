package inv.mgm.services.Controller;

import inv.mgm.services.Model.GenericResponse;
import inv.mgm.services.Model.SalesBillModel;
import inv.mgm.services.Service.BillingService;
import inv.mgm.services.utils.Constants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Optional;

@RestController
@CrossOrigin("*")
public class BillingController {
    private static final Logger logger = LoggerFactory.getLogger(BillingController.class);
    @Autowired
    BillingService billingService;

    @PostMapping("/createBill")
    public ResponseEntity<GenericResponse> createBill(@RequestBody SalesBillModel billModel) {
        try {
            logger.info("Received bill for customer: {}", billModel.getCustomer().getName());
            return ResponseEntity.ok(GenericResponse.builder()
                            .respCode(200)
                            .respMesaage("SUC")
                            .respData(billingService.processBill(billModel))
                    .build());
        } catch (Exception e) {
            logger.error("Error processing bill: ", e);
            return ResponseEntity.ok(GenericResponse.builder()
                            .respCode(500)
                            .respMesaage(Constants.SYS_ERR_MSG)
                    .build());
        }
    }

    @GetMapping("/getBillsBasedOnDate")
    public ResponseEntity<GenericResponse> getAllBillsBasedOnDate(
            @RequestParam Optional<LocalDate> startDt,
            @RequestParam Optional<LocalDate> endDt) {
        return ResponseEntity.ok(GenericResponse.builder()
                        .respCode(HttpStatus.OK.value())
                        .respMesaage("SUC")
                        .respData(billingService.findAllBillsBetweenDateRange(startDt.orElse(LocalDate.now()), endDt.orElse(LocalDate.now())))
                .build());
    }
}
