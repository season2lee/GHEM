package com.ssafy.ghem.user.model.respository.common;

import com.ssafy.ghem.user.model.entity.Cpu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CpuCommonRepository extends JpaRepository<Cpu, Long> {
    @Query(value = "select c.model from Cpu c where c.brand=:brand and c.model like %:model%")
    List<String> getCpuByBrand(String brand, String model);

    @Query(value = "select distinct c.brand from Cpu  c")
    List<String> getAllDistnct();

    @Query(value = "select c from Cpu c where c.model=:model")
    Cpu getCpuByModel(String model);
}
