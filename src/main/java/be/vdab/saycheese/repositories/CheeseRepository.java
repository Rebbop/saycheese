package be.vdab.saycheese.repositories;
import be.vdab.saycheese.entities.Cheese;
import be.vdab.saycheese.entities.Country;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
public interface CheeseRepository extends JpaRepository<Cheese, Long>{
    List<Cheese> findAll(Sort sort);
    List<Cheese> findByCountryId(Long countryId);
}
