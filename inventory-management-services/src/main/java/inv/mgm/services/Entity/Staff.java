package inv.mgm.services.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Staff {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String name;
    private String email;
    private String phone;
    private String address;
    private String position;
    private Integer stampUser;
    private String stampDate;
    private String info1;

    public Staff(Integer id, String name, String email, String phone, String address, String position, Integer stampUser, String stampDate, String info1) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.position = position;
        this.stampUser = stampUser;
        this.stampDate = stampDate;
        this.info1 = info1;
    }
    public Staff() {
        // Default constructor
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
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

    public String getInfo1() {
        return info1;
    }

    public void setInfo1(String info1) {
        this.info1 = info1;
    }
}
