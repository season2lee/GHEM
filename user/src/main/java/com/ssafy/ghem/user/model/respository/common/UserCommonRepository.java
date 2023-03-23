package com.ssafy.ghem.user.model.respository.common;

import com.ssafy.ghem.user.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserCommonRepository extends JpaRepository<User, Long> {
}
