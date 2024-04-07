package be.vdab.saycheese.controllers;

import be.vdab.saycheese.DTO.CheeseDTO;
import be.vdab.saycheese.entities.Cheese;
import be.vdab.saycheese.services.CheeseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cheeses")
public class CheeseController {

    private final CheeseService cheeseService;

    @Autowired
    public CheeseController(CheeseService cheeseService) {
        this.cheeseService = cheeseService;
    }

    @GetMapping("/countries/{countryId}")
    public ResponseEntity<List<Cheese>> getCheesesByCountryId(@PathVariable Long countryId) {
        List<Cheese> cheeses = cheeseService.getCheesesByCountryId(countryId);
        return ResponseEntity.ok(cheeses);
    }

    @GetMapping("/{cheeseId}")
    public ResponseEntity<CheeseDTO> getCheeseById(@PathVariable Long cheeseId) {
        Optional<Cheese> cheese = cheeseService.getCheeseById(cheeseId);
        if (cheese.isPresent()) {
            return ResponseEntity.ok(cheese.get().mapToDTO());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/search")
    public List<Cheese> searchCheeses(@RequestParam String query) {
        return cheeseService.searchCheeses(query);
    }

}