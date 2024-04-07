package be.vdab.saycheese.repositories;
import be.vdab.saycheese.entities.Cheese;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CheeseRepository extends JpaRepository<Cheese, Long>{
    List<Cheese> findAll(Sort sort);
    List<Cheese> findByCountryId(Long countryId);

    Optional<Cheese> findById (Long id);
}
