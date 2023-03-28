package com.ssafy.ghem.user.model.respository.individual;

import com.ssafy.ghem.user.model.entity.Follower;
import com.ssafy.ghem.user.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FollowerIndividualRepository extends JpaRepository<Follower, Long> {

    List<Follower> findByUser(User user);

    Optional<Follower> findByUserAndFollower(User user, User follower);
}
