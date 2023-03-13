package com.ssafy.ghem.user.model.repository;

import com.ssafy.ghem.user.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

}
