package be.vdab.saycheese.services;
import be.vdab.saycheese.entities.Cheese;
import be.vdab.saycheese.repositories.CheeseRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CheeseService {

    private final CheeseRepository cheeseRepository;
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
    public List<Cheese> searchCheeses(String name) {
        return cheeseRepository.findByNameContainingIgnoreCase(name);
    }
    @Transactional
    public Cheese likeCheese(Long cheeseId) {
        Cheese cheese = cheeseRepository.findById(cheeseId).orElseThrow(); // handle the exception as you see fit
        cheese.like();
        return cheeseRepository.save(cheese);
    }
    @Transactional
    public Cheese dislikeCheese(Long cheeseId) {
        Cheese cheese = cheeseRepository.findById(cheeseId).orElseThrow(); // handle the exception as you see fit
        cheese.dislike();
        return cheeseRepository.save(cheese);
    }
}