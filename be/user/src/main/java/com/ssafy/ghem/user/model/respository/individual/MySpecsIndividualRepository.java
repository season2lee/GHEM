package com.ssafy.ghem.user.model.respository.individual;

import com.ssafy.ghem.user.model.entity.MyPcSpecs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MySpecsIndividualRepository extends JpaRepository<MyPcSpecs, Long> {
    @Query(value = "select m from MyPcSpecs m where m.user_id=:user_id")
    MyPcSpecs getMyPcSpecsByUserId(Long user_id);
}
