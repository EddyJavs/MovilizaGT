package gt.app.MovilizaGT.repository;


import gt.app.MovilizaGT.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Person, Integer> {
    Optional<Person> findByEmailAndPass(String email, String pass);

    Optional<Person> findByDpiOrEmail(String dpi, String email);

    @Query("SELECT p FROM Person p WHERE p.accountStatus = :accountStatus")
    List<Person> findAllByAccountStatus(@Param("accountStatus") Integer accountStatus);
}
