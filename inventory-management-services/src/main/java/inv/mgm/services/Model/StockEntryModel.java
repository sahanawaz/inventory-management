package inv.mgm.services.Model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StockEntryModel {
    private Integer categoryType;
    private Integer inventoryType;
    private Integer color;
    private Integer dimension;
    private Double unitCp;
    private Double unitSp;
    private Integer qnt;
    private String date;
    private String description;

    @Override
    public String toString() {
        return new com.google.gson.Gson().toJson(this);
    }
}
