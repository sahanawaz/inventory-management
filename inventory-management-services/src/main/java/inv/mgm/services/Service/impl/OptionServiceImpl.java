package inv.mgm.services.Service.impl;

import inv.mgm.services.Model.OptionIdValueDto;
import inv.mgm.services.Repository.SysOptionRepository;
import inv.mgm.services.Service.OptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class OptionServiceImpl implements OptionService {
    @Autowired
    private SysOptionRepository optionRepo;
    @Override
    public List<OptionIdValueDto> getAllOptionsByOptionCode(List<String> optionCodes) {
        return optionRepo.findByOptionCodeIn(optionCodes);
    }
}
