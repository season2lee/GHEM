package com.ssafy.ghem.user.model.respository.common;

import com.ssafy.ghem.user.model.entity.Cpu;
import com.ssafy.ghem.user.model.entity.Gpu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface GpuCommonRepository extends JpaRepository<Gpu, Long> {
    @Query(value = "select g.model from Gpu g where g.brand=:brand and g.model like %:model%")
    List<String> getGpuByBrand(String brand, String model);

    @Query(value = "select distinct g.brand from Gpu  g")
    List<String> getAllDistnct();

    @Query(value = "select g from Gpu g where g.model=:model")
    Gpu getGpuByModel(String model);
}
