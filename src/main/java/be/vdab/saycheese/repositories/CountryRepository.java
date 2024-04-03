package be.vdab.saycheese.repositories;
import be.vdab.saycheese.entities.Country;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CountryRepository extends JpaRepository<Country, Long> {
    List<Country> findAll(Sort sort);
}