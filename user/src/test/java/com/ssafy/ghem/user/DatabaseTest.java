package com.ssafy.ghem.user;


import com.ssafy.ghem.user.common.repository.UserCommonRepository;
import com.ssafy.ghem.user.individual.repository.UserIndividualRepository;
import com.ssafy.ghem.user.model.entity.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@EnableTransactionManagement
public class DatabaseTest {

    @Autowired
    UserCommonRepository cuser;

    @Autowired
    UserIndividualRepository iuser;

    @Test
    @Transactional("commonTransactionManager")
    @Rollback(value = false)
    void commonTest() throws Exception {
        User user = User.builder()
                .nickname("common")
                .gender(1)
                .steamId("123456789")
                .build();

        cuser.save(user);
    }

    @Test
    @Transactional("individualTransactionManager")
    @Rollback(value = false)
    void individualTest() throws Exception {
        User user = User.builder()
                .nickname("individual")
                .gender(1)
                .steamId("123")
                .build();

        iuser.save(user);
    }


}
