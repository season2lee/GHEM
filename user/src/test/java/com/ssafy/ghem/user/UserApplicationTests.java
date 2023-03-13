package com.ssafy.ghem.user;

import com.ssafy.ghem.user.model.entity.Game;
import com.ssafy.ghem.user.model.entity.User;
import com.ssafy.ghem.user.model.entity.UserGame;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.ArrayList;

@SpringBootTest
@Transactional
@Rollback(value = false)
class UserApplicationTests {

	@PersistenceContext
	EntityManager em;

	@Test
	void contextLoads() {
		User user = User.builder()
				.userProfile("asdgasdgdasg")
				.userBirth("asgasdgsdg")
				.gender(1)
				.introduce("asdgasdgasdg")
				.nickname("asdgasdg")
				.userImage("asdgasdgasdg")
				.steamId("asdgasdg")
				.userGames(new ArrayList<>())
				.build();

		em.persist(user);

		Game game = Game.builder()
				.genre("gtguyg7y")
				.game_path("hiftftyb")
				.userGames(new ArrayList<>())
				.build();

		em.persist(game);

		UserGame userGame = UserGame.builder()
				.typeId(123L)
				.build();

		userGame.set(game, user);

		em.persist(userGame);


	}
}
