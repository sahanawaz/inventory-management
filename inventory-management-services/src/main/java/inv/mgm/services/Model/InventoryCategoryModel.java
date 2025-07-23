package inv.mgm.services.Model;

import inv.mgm.services.Entity.SysOption;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.time.LocalDate;

public class InventoryCategoryModel {
    private Integer id;
    private SysOptionModel categoryType;
    private SysOptionModel color;
    private SysOptionModel dimension;
    private Integer stampUser;
    private LocalDate stampDate;

    public InventoryCategoryModel() {
        // Default constructor
    }

    public InventoryCategoryModel(Integer id, SysOptionModel categoryType, SysOptionModel color, SysOptionModel dimension, Integer stampUser, LocalDate stampDate) {
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

    public SysOptionModel getCategoryType() {
        return categoryType;
    }

    public void setCategoryType(SysOptionModel categoryType) {
        this.categoryType = categoryType;
    }

    public SysOptionModel getColor() {
        return color;
    }

    public void setColor(SysOptionModel color) {
        this.color = color;
    }

    public SysOptionModel getDimension() {
        return dimension;
    }

    public void setDimension(SysOptionModel dimension) {
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
}
