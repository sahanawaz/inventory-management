package inv.mgm.services.Entity;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
public class Inventory {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @Column(nullable = false)
    private Double unitCp;
    @Column(nullable = false)
    private Double unitSp;
    @Column(nullable = false)
    private LocalDate date;
    @Column(nullable = false)
    private Integer stampUser;
    @Column(nullable = false)
    private LocalDate stampDate = LocalDate.now();
    private String inventoryDesc;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "inventory_type", referencedColumnName = "id")
    private SysOption inventoryType;

//    @OneToOne(fetch = FetchType.LAZY)
//    List<InventoryInfo> inventoryInfoList;

    public Inventory(Integer id, Double unitCp, Double unitSp, LocalDate date, Integer stampUser, LocalDate stampDate, String inventoryDesc, SysOption inventoryType) {
        this.id = id;
        this.unitCp = unitCp;
        this.unitSp = unitSp;
        this.date = date;
        this.stampUser = stampUser;
        this.stampDate = stampDate;
        this.inventoryDesc = inventoryDesc;
        this.inventoryType = inventoryType;
    }
    public Inventory() {
        // Default constructor
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

    public String getInventoryDesc() {
        return inventoryDesc;
    }

    public void setInventoryDesc(String inventoryDesc) {
        this.inventoryDesc = inventoryDesc;
    }

    public SysOption getInventoryType() {
        return inventoryType;
    }

    public void setInventoryType(SysOption inventoryType) {
        this.inventoryType = inventoryType;
    }

    //    public List<InventoryInfo> getInventoryInfoList() {
//        return inventoryInfoList;
//    }
//
//    public void setInventoryInfoList(List<InventoryInfo> inventoryInfoList) {
//        this.inventoryInfoList = inventoryInfoList;
//    }
}
