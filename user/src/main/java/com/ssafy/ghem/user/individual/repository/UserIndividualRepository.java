package com.ssafy.ghem.user.individual.repository;

import com.ssafy.ghem.user.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserIndividualRepository extends JpaRepository<User, Long> {
}
