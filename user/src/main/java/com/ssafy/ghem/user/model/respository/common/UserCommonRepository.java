package com.ssafy.ghem.user.model.respository.common;

import com.ssafy.ghem.user.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;


public interface UserCommonRepository extends JpaRepository<User, Long> {

    public User findUserById(String id);
}
