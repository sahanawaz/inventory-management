package inv.mgm.services.Model;

import java.time.LocalDate;

public class InventoryModel {
    private Integer id;
    private Double unitCp;
    private Double unitSp;
    private LocalDate date;
    private Integer stampUser;
    private LocalDate stampDate;
    public InventoryModel() {
        // Default constructor
    }
    public InventoryModel(Integer id, Double unitCp, Double unitSp, LocalDate date, Integer stampUser, LocalDate stampDate) {
        this.id = id;
        this.unitCp = unitCp;
        this.unitSp = unitSp;
        this.date = date;
        this.stampUser = stampUser;
        this.stampDate = stampDate;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
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
