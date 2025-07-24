package inv.mgm.services.Model;

import inv.mgm.services.Entity.Customer;

import javax.swing.*;
import java.util.SplittableRandom;

public class CustomerBillModel {
    private String name;
    private String address;
    private String phone;
    private String email;
    private String city;
    private String state;
    private String postCode;

    public CustomerBillModel(String name, String address, String phone, String email, String city, String state, String postCode) {
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.city = city;
        this.state = state;
        this.postCode = postCode;
    }
    public CustomerBillModel() {
        // Default constructor
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getPostCode() {
        return postCode;
    }

    public void setPostCode(String postCode) {
        this.postCode = postCode;
    }


    public String jsonString() {
        return "{" +
                "name:'" + name + '\'' +
                ", address:'" + address + '\'' +
                ", phone:'" + phone + '\'' +
                ", email:'" + email + '\'' +
                ", city:'" + city + '\'' +
                ", state:'" + state + '\'' +
                ", postCode:'" + postCode + '\'' +
                '}';
    }
}
