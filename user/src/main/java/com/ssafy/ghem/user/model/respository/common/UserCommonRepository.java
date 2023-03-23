package com.ssafy.ghem.user.model.respository.common;

import com.ssafy.ghem.user.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;


public interface UserCommonRepository extends JpaRepository<User, Long> {
    User findUserById(String id);

    @Modifying
    @Query("UPDATE User u set u.nickname=:nickname, u.userProfile=:userProfile where u.user_id=:userId")
    int updateUserInfo(@Param(value = "nickname")String nickname, @Param(value = "userProfile")String userProfile, @Param(value = "userId")String userId);
}
