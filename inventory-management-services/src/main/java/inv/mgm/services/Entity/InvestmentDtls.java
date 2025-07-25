package inv.mgm.services.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class InvestmentDtls {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String investmentType;
    private Double amount;
    private String date;
    private Integer stampUser;
    private String stampDate;
    private String investorName;
    private String investorPhone;
    private String investorEmail;
    private String investorAddress;
    private String investorCity;
    private String investorState;
    private String postCode;
    private String description;

    public InvestmentDtls() {
        // Default constructor
    }
    public InvestmentDtls(Integer id, String investmentType, Double amount, String date, Integer stampUser, String stampDate,
                          String investorName, String investorPhone, String investorEmail, String investorAddress,
                          String investorCity, String investorState, String postCode, String description) {
        this.id = id;
        this.investmentType = investmentType;
        this.amount = amount;
        this.date = date;
        this.stampUser = stampUser;
        this.stampDate = stampDate;
        this.investorName = investorName;
        this.investorPhone = investorPhone;
        this.investorEmail = investorEmail;
        this.investorAddress = investorAddress;
        this.investorCity = investorCity;
        this.investorState = investorState;
        this.postCode = postCode;
        this.description = description;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getInvestmentType() {
        return investmentType;
    }

    public void setInvestmentType(String investmentType) {
        this.investmentType = investmentType;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Integer getStampUser() {
        return stampUser;
    }

    public void setStampUser(Integer stampUser) {
        this.stampUser = stampUser;
    }

    public String getStampDate() {
        return stampDate;
    }

    public void setStampDate(String stampDate) {
        this.stampDate = stampDate;
    }

    public String getInvestorName() {
        return investorName;
    }

    public void setInvestorName(String investorName) {
        this.investorName = investorName;
    }

    public String getInvestorPhone() {
        return investorPhone;
    }

    public void setInvestorPhone(String investorPhone) {
        this.investorPhone = investorPhone;
    }

    public String getInvestorEmail() {
        return investorEmail;
    }

    public void setInvestorEmail(String investorEmail) {
        this.investorEmail = investorEmail;
    }

    public String getInvestorAddress() {
        return investorAddress;
    }

    public void setInvestorAddress(String investorAddress) {
        this.investorAddress = investorAddress;
    }

    public String getInvestorCity() {
        return investorCity;
    }

    public void setInvestorCity(String investorCity) {
        this.investorCity = investorCity;
    }

    public String getInvestorState() {
        return investorState;
    }

    public void setInvestorState(String investorState) {
        this.investorState = investorState;
    }

    public String getPostCode() {
        return postCode;
    }

    public void setPostCode(String postCode) {
        this.postCode = postCode;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
