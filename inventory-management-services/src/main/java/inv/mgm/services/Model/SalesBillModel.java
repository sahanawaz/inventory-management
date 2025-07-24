package inv.mgm.services.Model;

import java.util.List;

public class SalesBillModel {
    private Integer id;
    private CustomerBillModel customer;
    private List<BillModel> billItems;
    private Double discount;

    public SalesBillModel(Integer id, CustomerBillModel customer, List<BillModel> billItems, Double discount) {
        this.id = id;
        this.customer = customer;
        this.billItems = billItems;
        this.discount = discount;
    }

    public SalesBillModel() {
        // Default constructor
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public CustomerBillModel getCustomer() {
        return customer;
    }

    public void setCustomer(CustomerBillModel customer) {
        this.customer = customer;
    }

    public List<BillModel> getBillItems() {
        return billItems;
    }

    public void setBillItems(List<BillModel> billItems) {
        this.billItems = billItems;
    }

    public Double getDiscount() {
        return discount;
    }

    public void setDiscount(Double discount) {
        this.discount = discount;
    }


    public String jsonString() {
        return "[{" +
                "customer:" + customer.jsonString() +
                ", billItems:" + billItems.toString() +
                ", discount:" + discount +
                "}]";
    }
}
