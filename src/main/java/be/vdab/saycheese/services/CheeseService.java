package be.vdab.saycheese.services;
import be.vdab.saycheese.entities.Cheese;
import be.vdab.saycheese.repositories.CheeseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CheeseService {

    private CheeseRepository cheeseRepository;
    @Autowired
    public CheeseService(CheeseRepository cheeseRepository) {
        this.cheeseRepository = cheeseRepository;
    }
    public List<Cheese> getCheesesByCountryId(Long countryId) {
        return cheeseRepository.findByCountryId(countryId);
    }
}