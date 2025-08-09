package inv.mgm.services.Model;

public class StockDataModel {
    private Integer invInfoId;
    private String sku;
    private String particulars;
    private Integer qty;
    private Double unitCp;
    private Double unitSp;
    private Double amount;

    public StockDataModel(Integer invInfoId, String sku, String particulars, Integer qty, Double unitCp, Double unitSp, Double amount) {
        this.invInfoId = invInfoId;
        this.sku = sku;
        this.particulars = particulars;
        this.qty = qty;
        this.unitCp = unitCp;
        this.unitSp = unitSp;
        this.amount = amount;
    }
    public StockDataModel() {
        // Default constructor
    }

    public Integer getInvInfoId() {
        return invInfoId;
    }

    public void setInvInfoId(Integer invInfoId) {
        this.invInfoId = invInfoId;
    }

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public String getParticulars() {
        return particulars;
    }

    public void setParticulars(String particulars) {
        this.particulars = particulars;
    }

    public Integer getQty() {
        return qty;
    }

    public void setQty(Integer qty) {
        this.qty = qty;
    }

    public Double getUnitCp() {
        return unitCp;
    }

    public void setUnitCp(Double unitCp) {
        this.unitCp = unitCp;
    }

    public Double getUnitSp() {
        return unitSp;
    }

    public void setUnitSp(Double unitSp) {
        this.unitSp = unitSp;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }
}
