package inv.mgm.services.Service;

import inv.mgm.services.Entity.Inventory;
import inv.mgm.services.Model.StocksModel;
import inv.mgm.services.Repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class InventoryServiceImpl implements InventoryService{
    @Autowired
    InventoryRepository inventoryRepository;
    /**
     * @return
     */
    @Override
    public List<Inventory> getAllStocks() {
        List<Inventory> inventories = inventoryRepository.findAll();


        return inventories;
    }

}
