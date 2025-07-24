package inv.mgm.services.Entity;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
public class Leadger {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "customer_id", referencedColumnName = "id")
    private Customer customerId;

    @Column(nullable = false)
    private Double billAmount;

    @Column(nullable = false)
    private Double taxAmount=0.0;

    @Column(nullable = false)
    private Double taxPercent = 0.0;

    @Column(nullable = true)
    private Double discountAmount = 0.0;

    @Column(nullable = false)
    private LocalDate billDate = LocalDate.now();

    private Integer stampUser;

    @OneToMany(mappedBy = "billId", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<BillDtls> billItems;



    public Leadger(Integer id, Customer customerId, Double billAmount, Double taxAmount, Double taxPercent, Double discountAmount, LocalDate billDate, Integer stampUser) {
        this.id = id;
        this.customerId = customerId;
        this.billAmount = billAmount;
        this.taxAmount = taxAmount;
        this.taxPercent = taxPercent;
        this.discountAmount = discountAmount;
        this.billDate = billDate;
        this.stampUser = stampUser;
    }
    public Leadger() {
        // Default constructor
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Customer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Customer customerId) {
        this.customerId = customerId;
    }

    public Double getBillAmount() {
        return billAmount;
    }

    public void setBillAmount(Double billAmount) {
        this.billAmount = billAmount;
    }

    public Double getTaxAmount() {
        return taxAmount;
    }

    public void setTaxAmount(Double taxAmount) {
        this.taxAmount = taxAmount;
    }

    public Double getTaxPercent() {
        return taxPercent;
    }

    public void setTaxPercent(Double taxPercent) {
        this.taxPercent = taxPercent;
    }

    public Double getDiscountAmount() {
        return discountAmount;
    }

    public void setDiscountAmount(Double discountAmount) {
        this.discountAmount = discountAmount;
    }

    public LocalDate getBillDate() {
        return billDate;
    }

    public void setBillDate(LocalDate billDate) {
        this.billDate = billDate;
    }

    public Integer getStampUser() {
        return stampUser;
    }

    public void setStampUser(Integer stampUser) {
        this.stampUser = stampUser;
    }

    public List<BillDtls> getBillItems() {
        return billItems;
    }

    public void setBillItems(List<BillDtls> billItems) {
        this.billItems = billItems;
    }
}
