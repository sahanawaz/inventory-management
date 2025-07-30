package inv.mgm.services.Model;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class InventoryStockModel {
    private String inventoryType;
    private String categoryType;
    private String sku;
    private String color;
    private String dimension;
    private Double unitCp;
    private Double unitSp;
    private Integer purchasedQty;
    private Integer soldQty;
    private Integer avlQnt;
    private String date;
    private String particular;
}
