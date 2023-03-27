package com.ssafy.ghem.convenience.model.respository.common;

import com.ssafy.ghem.convenience.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserCommonRepository extends JpaRepository<User, Long> {
    User findUserById(String id);
    User findUserByNickname(String nickname);
}
