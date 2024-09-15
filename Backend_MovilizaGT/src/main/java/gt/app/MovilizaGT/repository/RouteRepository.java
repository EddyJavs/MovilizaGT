package gt.app.MovilizaGT.repository;


import gt.app.MovilizaGT.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RouteRepository extends JpaRepository<Person, Integer> {
    Optional<Person> findByEmailAndPass(String email, String pass);

    Optional<Person> findByDpiOrEmail(String dpi, String email);
}
