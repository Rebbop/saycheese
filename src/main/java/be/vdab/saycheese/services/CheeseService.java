package be.vdab.saycheese.services;
import be.vdab.saycheese.entities.Cheese;
import be.vdab.saycheese.repositories.CheeseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
    public Optional<Cheese> getCheeseById(Long id) {
        Optional<Cheese> cheese = cheeseRepository.findById(id);
        cheese.ifPresent(c -> System.out.println("Cheese webpages: " + c.getWebpages()));
        return cheese;
    }
}