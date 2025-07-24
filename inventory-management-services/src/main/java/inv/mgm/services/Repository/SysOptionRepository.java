package inv.mgm.services.Repository;

import inv.mgm.services.Entity.SysOption;
import inv.mgm.services.Model.OptionIdValueDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SysOptionRepository extends JpaRepository<SysOption, Integer> {

    @Query("SELECT NEW inv.mgm.services.Model.OptionIdValueDto(s.id, s.optionValue, s.optionCode) FROM SysOption s WHERE s.optionCode IN (:codes)")
    List<OptionIdValueDto> findByOptionCodeIn(@Param("codes") List<String> optionCodes);
}
