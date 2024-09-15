package gt.app.MovilizaGT.repository;

import gt.app.MovilizaGT.entity.Stand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StandRepository extends JpaRepository<Stand, Integer> {
}
