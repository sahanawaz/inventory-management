package inv.mgm.services.Controller;

import inv.mgm.services.Model.GenericResponse;
import inv.mgm.services.Service.OptionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class SysOptionController {
    private static final Logger logger = LoggerFactory.getLogger(SysOptionController.class);
    @Autowired
    private OptionService optSrvc;

    @PostMapping("/options")
    public ResponseEntity<GenericResponse> getAllOptionsByOptCodes(@RequestBody List<String> opts) {
        logger.info("SysOptionController.getAllOptionsByOptCodes ---> START");
        return ResponseEntity.ok(GenericResponse.builder()
                        .respCode(200)
                        .respMesaage("SUC")
                        .respData(optSrvc.getAllOptionsByOptionCode(opts))
                .build());
    }

}
