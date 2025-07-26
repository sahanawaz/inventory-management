package inv.mgm.services.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class InventoryInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "inventory_id", referencedColumnName = "id")
    @JsonManagedReference
    private Inventory inventory;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    @JsonManagedReference
    private InventoryCategory category;
    @Column(nullable = false)
    private Integer purchasedQuantity;
    @Column(nullable = true)
    private Integer soldQuantity = 0;
    @Column(nullable = false, unique = true)
    private String inventorySku;
    @Column(nullable = false)
    private Integer stampUser;
    @Column(nullable = false)
    private LocalDate stampDate;

}
