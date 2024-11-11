package gt.app.MovilizaGT.repository;

import gt.app.MovilizaGT.entity.Qualification;
import gt.app.MovilizaGT.entity.Route;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QualificationRepository extends JpaRepository<Qualification, Integer> {
    List<Qualification> findByUser2UserId(Integer userId);
}



