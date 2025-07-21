package inv.mgm.services.Service;

import inv.mgm.services.Entity.Inventory;
import inv.mgm.services.Model.StocksModel;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface InventoryService {
    List<Inventory> getAllStocks();
}
