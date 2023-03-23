package com.ssafy.ghem.user.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;

import javax.sql.DataSource;
import java.util.HashMap;

@Configuration
@PropertySource({ "classpath:application.yml" })
@EnableJpaRepositories(
        basePackages = "com.ssafy.ghem.user.model.respository.individual", // Second Repository 경로
        entityManagerFactoryRef = "individualManager",
        transactionManagerRef = "individualTransactionManager"
)
public class IndividualConfig {
    @Autowired
    private Environment env;

    @Bean
    public LocalContainerEntityManagerFactoryBean individualManager() {
        LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
        em.setDataSource(secondDataSource());
        em.setPackagesToScan(new String[] { "com.ssafy.ghem.user.model.entity" });

        HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
        em.setJpaVendorAdapter(vendorAdapter);
        HashMap<String, Object> properties = new HashMap<>();
        properties.put("hibernate.hbm2ddl.auto", env.getProperty("spring.jpa.hibernate.ddl-auto"));
        properties.put("hibernate.dialect", env.getProperty("spring.jpa.database-platform"));
        em.setJpaPropertyMap(properties);
        return em;
    }

    @Bean
    @ConfigurationProperties(prefix="spring.second-datasource")
    public DataSource secondDataSource() {
        return DataSourceBuilder.create().build();
    }

    @Bean
    public PlatformTransactionManager individualTransactionManager() {
        JpaTransactionManager transactionManager = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(individualManager().getObject());
        return transactionManager;
    }
}


//@Configuration
//@EnableJpaRepositories(
//        basePackages = "com.ssafy.ghem.user.individual.repository", // Second Repository 경로
//        entityManagerFactoryRef = "individualManager",
//        transactionManagerRef = "individualTransactionManager"
//)
//public class IndividualConfig {
//    @Bean
//    public LocalContainerEntityManagerFactoryBean individualManager() {
//        LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
//
//        em.setDataSource(mysq2lDataSource());
//        em.setPackagesToScan(new String[]{"com.ssafy.ghem.user.model.entity"});
//        em.setJpaVendorAdapter(new HibernateJpaVendorAdapter());
//
//        return em;
//    }
//
//    @Bean
//    @ConfigurationProperties(prefix = "spring.second-datasource")
//    public DataSource mysq2lDataSource() {
//        return DataSourceBuilder.create().build();
//    }
//
//    @Bean
//    public PlatformTransactionManager individualTransactionManager() {
//        JpaTransactionManager transactionManager = new JpaTransactionManager();
//
//        transactionManager.setEntityManagerFactory(individualManager().getObject());
//
//        return transactionManager;
//    }
//}
