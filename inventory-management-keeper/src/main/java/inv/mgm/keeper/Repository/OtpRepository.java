package inv.mgm.keeper.Repository;

import inv.mgm.keeper.Entity.OtpEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OtpRepository extends JpaRepository<OtpEntity, Long> {
}
