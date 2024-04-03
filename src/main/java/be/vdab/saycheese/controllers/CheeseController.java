package be.vdab.saycheese.controllers;

import be.vdab.saycheese.entities.Cheese;
import be.vdab.saycheese.services.CheeseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/countries/{countryId}/cheeses")
public class CheeseController {

    private final CheeseService cheeseService;

    @Autowired
    public CheeseController(CheeseService cheeseService) {
        this.cheeseService = cheeseService;
    }

    @GetMapping
    public ResponseEntity<List<Cheese>> getCheesesByCountryId(@PathVariable Long countryId) {
        List<Cheese> cheeses = cheeseService.getCheesesByCountryId(countryId);
        return ResponseEntity.ok(cheeses);
    }
}