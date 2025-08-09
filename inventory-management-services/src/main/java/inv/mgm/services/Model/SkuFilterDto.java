package inv.mgm.services.Model;

import java.time.LocalDate;
import java.util.Optional;

public class SkuFilterDto {
    public Optional<LocalDate> fromDt = Optional.empty();
    public Optional<LocalDate> toDt = Optional.empty();
    public Optional<String> sku = Optional.empty();
}
