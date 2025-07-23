package inv.mgm.services.Model;

import inv.mgm.services.Entity.Inventory;
import inv.mgm.services.Entity.InventoryCategory;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.time.LocalDate;

public class InventoryInfoModel {
    private Integer id;
    private InventoryModel inventory;
    private InventoryCategoryModel categoryId;
    private Integer purchasedQuantity;
    private Integer soldQuantity;
    private String inventorySku;
    private Integer stampUser;
    private LocalDate stampDate;

    public InventoryInfoModel() {
        // Default constructor
    }
    public InventoryInfoModel(Integer id, InventoryModel inventory, InventoryCategoryModel categoryId, Integer purchasedQuantity, Integer soldQuantity, String inventorySku, Integer stampUser, LocalDate stampDate) {
        this.id = id;
        this.inventory = inventory;
        this.categoryId = categoryId;
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

    public InventoryModel getInventory() {
        return inventory;
    }

    public void setInventory(InventoryModel inventory) {
        this.inventory = inventory;
    }

    public InventoryCategoryModel getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(InventoryCategoryModel categoryId) {
        this.categoryId = categoryId;
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
