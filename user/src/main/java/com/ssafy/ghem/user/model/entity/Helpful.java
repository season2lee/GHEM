//package com.ssafy.ghem.user.model.entity;
//
//import lombok.AccessLevel;
//import lombok.Builder;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//
//import javax.persistence.*;
//
//@Entity
//@Getter
//@Table(name="helpful")
//public class Helpful {
//
//    @Id
//    @GeneratedValue
//    @Column(name = "helpful_id")
//    private Long helpfulId;
//
//    @OneToOne
//    @JoinColumn(name = "usergame_id")
//    private UserGame userGame;
//
//    private int helpful;
//
//    public Helpful(){
//        this.helpful = 0;
//    }
//
//    public void setUserGame(UserGame userGame){
//        this.userGame = userGame;
//    }
//
//    public void increaseHelpful(){
//        this.helpful += 1;
//    }
//
//
//}
