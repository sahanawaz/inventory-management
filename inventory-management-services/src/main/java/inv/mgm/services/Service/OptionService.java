package inv.mgm.services.Service;

import inv.mgm.services.Model.OptionIdValueDto;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface OptionService {

    public List<OptionIdValueDto> getAllOptionsByOptionCode(List<String> optionCodes);
}
