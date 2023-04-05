//package com.ssafy.ghem.user.model.respository.common;
//
//import com.ssafy.ghem.user.model.entity.Helpful;
//import com.ssafy.ghem.user.model.entity.UserGame;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//
//import java.util.Optional;
//
//public interface HelpfulCommonRepository extends JpaRepository<Helpful, Long> {
//    @Query(value = "select h from Helpful h where h.userGame =:userGame")
//    Optional<Helpful> findByUserGame(UserGame userGame);
//}
