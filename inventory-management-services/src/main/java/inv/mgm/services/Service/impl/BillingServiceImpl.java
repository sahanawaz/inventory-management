package inv.mgm.services.Service.impl;

import inv.mgm.services.Entity.BillDtls;
import inv.mgm.services.Entity.Customer;
import inv.mgm.services.Entity.InventoryInfo;
import inv.mgm.services.Entity.Leadger;
import inv.mgm.services.Model.BillModel;
import inv.mgm.services.Model.CustomerBillModel;
import inv.mgm.services.Model.SalesBillModel;
import inv.mgm.services.Repository.BillingRepository;
import inv.mgm.services.Repository.CustomerRepository;
import inv.mgm.services.Repository.InventoryRepository;
import inv.mgm.services.Service.BillingService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class BillingServiceImpl implements BillingService {

    @Autowired
    BillingRepository billingRepository;
    @Autowired
    CustomerRepository customerRepository;
    @Autowired
    InventoryRepository inventoryRepository;

    @Override
    @Transactional
    public Leadger processBill(SalesBillModel billModel) {
        if (Objects.isNull(billModel)|| Objects.isNull(billModel.getBillItems()) || billModel.getBillItems().isEmpty()) {
            throw new IllegalArgumentException("Bill model or items cannot be null or empty");
        }
        Leadger leadger = new Leadger();
        leadger.setId(billModel.getId());
        leadger.setCustomerId(getCustomerData(billModel.getCustomer()));
        leadger.setBillDate(LocalDate.now());
        leadger.setStampUser(0);
        leadger.setDiscountAmount(billModel.getDiscount());
        leadger.setTaxAmount(0.0);
        leadger.setTaxPercent(0.0);
        //set bill details
        double totalAmount = 0.0;
        List<BillDtls> bills = new ArrayList<>();
        for(BillModel billItem : billModel.getBillItems()) {
            BillDtls billDtls = new BillDtls();
            billDtls.setAmount(billItem.getAmount());
            billDtls.setInfo("");
            billDtls.setQuantity(billItem.getQuantity());
            billDtls.setParticulars(billItem.getParticulars());
            billDtls.setStampUser(0);
            //get inventory info by SKU
            billDtls.setInventoryInfoId(getInventoryInfo(billItem.getSku()));
            billDtls.setStampDate(LocalDate.now());
            billDtls.setQuantity(billItem.getQuantity());
            billDtls.setTaxAmount(0.0);
            totalAmount += billItem.getUnitSp();
            bills.add(billDtls);
        }
        leadger.setBillAmount(totalAmount);
        leadger.setBillItems(bills);

        return billingRepository.save(leadger);
    }

    Customer getCustomerData(CustomerBillModel customerBillModel) {
        // Fetch customer by phone number
        Customer customer = customerRepository.findOneByPhone(customerBillModel.getPhone());

        if(Objects.isNull(customer)) {
            // If customer does not exist, create a new one
            customer = new Customer();
            customer.setName(customerBillModel.getName());
            customer.setEmail(customerBillModel.getEmail());
            customer.setPhone(customerBillModel.getPhone());
            customer.setAddress(customerBillModel.getAddress());
        }
        return customer;
    }

    InventoryInfo getInventoryInfo(String inventorySku) {
        // Fetch inventory info by SKU
        List<InventoryInfo> inventoryInfos = inventoryRepository.findByInventorySku(inventorySku);
        if (inventoryInfos.isEmpty()) {
            throw new IllegalArgumentException("Inventory item not found for SKU: " + inventorySku);
        }
        return inventoryInfos.get(0); // Assuming SKU is unique, return the first match
    }
}
