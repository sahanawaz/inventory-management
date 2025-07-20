package inv.mgm.services.Entity;

import jakarta.persistence.*;

@Entity
public class Expenditure {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "expenditure_type", referencedColumnName = "id")
    private SysOption expenditureType;
    private Double amount;
    private String info;
    @ManyToOne
    @JoinColumn(name = "paid_by", referencedColumnName = "id")
    private Staff paidBy;
    private Integer stampUser;

    public Expenditure(Integer id, SysOption expenditureType, Double amount, String info, Staff paidBy, Integer stampUser) {
        this.id = id;
        this.expenditureType = expenditureType;
        this.amount = amount;
        this.info = info;
        this.paidBy = paidBy;
        this.stampUser = stampUser;
    }
    public Expenditure() {
        // Default constructor
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public SysOption getExpenditureType() {
        return expenditureType;
    }

    public void setExpenditureType(SysOption expenditureType) {
        this.expenditureType = expenditureType;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public Staff getPaidBy() {
        return paidBy;
    }

    public void setPaidBy(Staff paidBy) {
        this.paidBy = paidBy;
    }

    public Integer getStampUser() {
        return stampUser;
    }

    public void setStampUser(Integer stampUser) {
        this.stampUser = stampUser;
    }
}
