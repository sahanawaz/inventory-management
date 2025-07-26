package inv.mgm.services.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class BillDtls {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "bill_id")
    private Ledger ledger;

    @ManyToOne
    @JoinColumn(name = "inventory_info_id", referencedColumnName = "id")
    @JsonBackReference
    private InventoryInfo inventoryInfoId;

    @Column(nullable = false)
    private String particulars;

    @Column(nullable = false)
    private Integer quantity;

    @Column(nullable = false)
    private Double amount;

    @Column(nullable = true)
    private Double taxAmount=0.0;

    @Column(nullable = true)
    private String info;

    @Column(nullable = false)
    private Integer stampUser;

    @Column
    private LocalDate stampDate = LocalDate.now();

    public BillDtls() {
        // Default constructor
    }
    public BillDtls(Integer id, Ledger ledger, InventoryInfo inventoryInfoId, String particulars, Integer quantity, Double amount, Double taxAmount, String info, Integer stampUser, LocalDate stampDate) {
        this.id = id;
        this.ledger = ledger;
        this.inventoryInfoId = inventoryInfoId;
        this.particulars = particulars;
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

    public Ledger getLedger() {
        return ledger;
    }

    public void setLedger(Ledger ledger) {
        this.ledger = ledger;
    }

    public InventoryInfo getInventoryInfoId() {
        return inventoryInfoId;
    }

    public void setInventoryInfoId(InventoryInfo inventoryInfoId) {
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

    public String getParticulars() {
        return particulars;
    }

    public void setParticulars(String particulars) {
        this.particulars = particulars;
    }
}
