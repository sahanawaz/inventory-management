package inv.mgm.services.Entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
public class InventoryCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "category_type", referencedColumnName = "id")
    @JsonManagedReference
    private SysOption categoryType;
    @ManyToOne
    @JoinColumn(name = "color", referencedColumnName = "id")
    @JsonManagedReference
    private SysOption color;
    @ManyToOne
    @JoinColumn(name = "dimension", referencedColumnName = "id")
    @JsonManagedReference
    private SysOption dimension;
    private Integer stampUser;
    @Column(nullable = false)
    private LocalDate stampDate = LocalDate.now();


    public InventoryCategory() {
        // Default constructor
    }
    public InventoryCategory(Integer id, SysOption categoryType, SysOption color, SysOption dimension, Integer stampUser, LocalDate stampDate) {
        this.id = id;
        this.categoryType = categoryType;
        this.color = color;
        this.dimension = dimension;
        this.stampUser = stampUser;
        this.stampDate = stampDate;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public SysOption getCategoryType() {
        return categoryType;
    }

    public void setCategoryType(SysOption categoryType) {
        this.categoryType = categoryType;
    }

    public SysOption getColor() {
        return color;
    }

    public void setColor(SysOption color) {
        this.color = color;
    }

    public SysOption getDimension() {
        return dimension;
    }

    public void setDimension(SysOption dimension) {
        this.dimension = dimension;
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

//    public List<InventoryInfo> getInventoryInfoList() {
//        return inventoryInfoList;
//    }
//
//    public void setInventoryInfoList(List<InventoryInfo> inventoryInfoList) {
//        this.inventoryInfoList = inventoryInfoList;
//    }
}
