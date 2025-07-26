package inv.mgm.services.Model;

public class BillModel {
    private Integer invInfoId;
    private Double amount;
    private String particulars;
    private int qty;
    private String sku;
    private Double unitCp;
    private Double unitSp;

    public BillModel(Integer invInfoId, Double amount, String particulars, int qty, String sku, Double unitCp, Double unitSp) {
        this.invInfoId = invInfoId;
        this.amount = amount;
        this.particulars = particulars;
        this.qty = qty;
        this.sku = sku;
        this.unitCp = unitCp;
        this.unitSp = unitSp;
    }
    public BillModel() {
        // Default constructor
    }

    public Integer getInvInfoId() {
        return invInfoId;
    }

    public void setInvInfoId(Integer invInfoId) {
        this.invInfoId = invInfoId;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getParticulars() {
        return particulars;
    }

    public void setParticulars(String particulars) {
        this.particulars = particulars;
    }

    public int getQty() {
        return qty;
    }

    public void setQty(int qty) {
        this.qty = qty;
    }

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
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


    @Override
    public String toString() {
        return "{" +
                "invInfoId:" + invInfoId +
                ", amount:" + amount +
                ", particulars:'" + particulars + '\'' +
                ", quantity:" + qty +
                ", sku:'" + sku + '\'' +
                ", unitCp:" + unitCp +
                ", unitSp:" + unitSp +
                '}';
    }
}
