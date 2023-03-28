package com.ssafy.ghem.user.model.respository.individual;

import com.ssafy.ghem.user.model.entity.Following;
import com.ssafy.ghem.user.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FollowingIndividualRepository extends JpaRepository<Following,Long> {
    List<Following> findByUser(User user);
    Optional<Following> findByUserAndFollowing(User user, User following);
}
