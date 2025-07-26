package inv.mgm.services.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class BillDtls {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "bill_id", referencedColumnName = "id")
    @JsonBackReference
    private Ledger ledger;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "inventory_info_id", referencedColumnName = "id")
    @JsonManagedReference
    private InventoryInfo inventoryInfo;

    @Column(nullable = false)
    private String particulars;

    @Column(nullable = false)
    private Integer quantity;

    @Column(nullable = false)
    private Double amount;

    @Column(nullable = true)
    private Double taxAmount=0.0;

    @Column(nullable = true)
    private String info;

    @Column(nullable = false)
    private Integer stampUser;

    @Column
    private LocalDate stampDate = LocalDate.now();
}
