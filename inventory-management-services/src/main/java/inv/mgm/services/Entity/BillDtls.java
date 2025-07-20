package inv.mgm.services.Entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class BillDtls {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "bill_id", referencedColumnName = "id")
    private Leadger billId;
    private Integer inventoryInfoId;
    private Integer quantity;
    private Double amount;
    private Double taxAmount;
    private String info;
    private Integer stampUser;
    private LocalDate stampDate;
    public BillDtls() {
        // Default constructor
    }
    public BillDtls(Integer id, Leadger billId, Integer inventoryInfoId, Integer quantity, Double amount, Double taxAmount, String info, Integer stampUser, LocalDate stampDate) {
        this.id = id;
        this.billId = billId;
        this.inventoryInfoId = inventoryInfoId;
        this.quantity = quantity;
        this.amount = amount;
        this.taxAmount = taxAmount;
        this.info = info;
        this.stampUser = stampUser;
        this.stampDate = stampDate;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Leadger getBillId() {
        return billId;
    }

    public void setBillId(Leadger billId) {
        this.billId = billId;
    }

    public Integer getInventoryInfoId() {
        return inventoryInfoId;
    }

    public void setInventoryInfoId(Integer inventoryInfoId) {
        this.inventoryInfoId = inventoryInfoId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public Double getTaxAmount() {
        return taxAmount;
    }

    public void setTaxAmount(Double taxAmount) {
        this.taxAmount = taxAmount;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public Integer getStampUser() {
        return stampUser;
    }

    public void setStampUser(Integer stampUser) {
        this.stampUser = stampUser;
    }

    public LocalDate getStampDate() {
        return stampDate;
    }

    public void setStampDate(LocalDate stampDate) {
        this.stampDate = stampDate;
    }
}
