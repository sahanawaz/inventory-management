package inv.mgm.services.Model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class InventoryStockModel {
    private String inventoryType;
    private String sku;
    private String color;
    private String dimension;
    private Double unitCp;
    private Double unitSp;
    private Integer avlQnt;
    private String date;
}
