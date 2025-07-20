package inv.mgm.services.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDate;

@Entity
public class Inventory {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private Double unityCp;
    private Double unitySp;
    private LocalDate date;
    private Integer stampUser;
    private LocalDate stampDate;

    public Inventory(Integer id, Double unityCp, Double unitySp, LocalDate date, Integer stampUser, LocalDate stampDate) {
        this.id = id;
        this.unityCp = unityCp;
        this.unitySp = unitySp;
        this.date = date;
        this.stampUser = stampUser;
        this.stampDate = stampDate;
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

    public Double getUnityCp() {
        return unityCp;
    }

    public void setUnityCp(Double unityCp) {
        this.unityCp = unityCp;
    }

    public Double getUnitySp() {
        return unitySp;
    }

    public void setUnitySp(Double unitySp) {
        this.unitySp = unitySp;
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
