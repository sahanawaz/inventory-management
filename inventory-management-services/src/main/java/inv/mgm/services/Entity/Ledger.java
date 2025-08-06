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
public class Ledger {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "customer_id", referencedColumnName = "id")
    private Customer customerId;

    @Column(nullable = false)
    private Double billAmount;

    @Column(nullable = false)
    private Double taxAmount=0.0;

    @Column(nullable = false)
    private Double taxPercent = 0.0;

    @Column(nullable = true)
    private Double discountAmount = 0.0;

    @Column(nullable = false)
    private LocalDate billDate = LocalDate.now();

    private Integer stampUser;

    @Column
    private Double additionalCharges;
    @OneToMany(mappedBy = "ledger", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<BillDtls> billArr;

}
