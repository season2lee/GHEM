package com.ssafy.ghem.user.model.respository.individual;

import com.ssafy.ghem.user.model.entity.Dib;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DibsIndividualRepository extends JpaRepository<Dib, Long> {
    @Query(value = "select d from Dib d where d.app_id=:app_id and d.user_id=:user_id")
    Dib getByAppIdAndUserId(Long app_id, Long user_id);

    @Query(value = "select d from Dib d where d.user_id=:user_id")
    List<Dib> getListByAppId(Long user_id);

    @Query(value = "delete Dib d where d.app_id=:app_id and d.user_id=:user_id")
    void deleteBappIdAnduserId(Long app_id, Long user_id);
}
