package inv.mgm.services.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class InventoryInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "inventory_id", referencedColumnName = "id")
    @JsonBackReference
    private Inventory inventory;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    @JsonBackReference
    private InventoryCategory category;
    @Column(nullable = false)
    private Integer purchasedQuantity;
    @Column(nullable = true)
    private Integer soldQuantity = 0;
    @Column(nullable = false, unique = true)
    private String inventorySku;
    @Column(nullable = false)
    private Integer stampUser;
    @Column(nullable = false)
    private LocalDate stampDate;

    public InventoryInfo() {
        // Default constructor
    }
    public InventoryInfo(Integer id, Inventory inventory, InventoryCategory category, Integer purchasedQuantity, Integer soldQuantity, String inventorySku, Integer stampUser, LocalDate stampDate) {
        this.id = id;
        this.inventory = inventory;
        this.category = category;
        this.purchasedQuantity = purchasedQuantity;
        this.soldQuantity = soldQuantity;
        this.inventorySku = inventorySku;
        this.stampUser = stampUser;
        this.stampDate = stampDate;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Inventory getInventory() {
        return inventory;
    }

    public void setInventory(Inventory inventory) {
        this.inventory = inventory;
    }

    public InventoryCategory getCategory() {
        return category;
    }

    public void setCategory(InventoryCategory category) {
        this.category = category;
    }

    public Integer getPurchasedQuantity() {
        return purchasedQuantity;
    }

    public void setPurchasedQuantity(Integer purchasedQuantity) {
        this.purchasedQuantity = purchasedQuantity;
    }

    public Integer getSoldQuantity() {
        return soldQuantity;
    }

    public void setSoldQuantity(Integer soldQuantity) {
        this.soldQuantity = soldQuantity;
    }

    public String getInventorySku() {
        return inventorySku;
    }

    public void setInventorySku(String inventorySku) {
        this.inventorySku = inventorySku;
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
