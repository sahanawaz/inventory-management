package inv.mgm.services.Model;

import inv.mgm.services.Entity.Customer;

public class CustomerBillModel {
    private Customer customer;
    private String billDate;
    private Double billAmount;
    private Double taxAmount;
    private Double taxPercent;
    private Double discountAmount;
    private Integer stampUser;
    private Integer quantity;
    private String info;

    public CustomerBillModel(Customer customer, String billDate, Double billAmount, Double taxAmount, Double taxPercent, Double discountAmount, Integer stampUser, Integer quantity, String info) {
        this.customer = customer;
        this.billDate = billDate;
        this.billAmount = billAmount;
        this.taxAmount = taxAmount;
        this.taxPercent = taxPercent;
        this.discountAmount = discountAmount;
        this.stampUser = stampUser;
        this.quantity = quantity;
        this.info = info;
    }
    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public String getBillDate() {
        return billDate;
    }

    public void setBillDate(String billDate) {
        this.billDate = billDate;
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

    public Integer getStampUser() {
        return stampUser;
    }

    public void setStampUser(Integer stampUser) {
        this.stampUser = stampUser;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }
}
