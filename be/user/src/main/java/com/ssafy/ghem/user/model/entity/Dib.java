package com.ssafy.ghem.user.model.entity;

import lombok.*;
import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name="dibs")
public class Dib {
    @Id @GeneratedValue
    @Column(name = "dibs_id")
    private Long dibs_id;
    private Long user_id;
    private Long app_id;

    @Builder
    public Dib(Long user_id, Long app_id) {
        this.user_id = user_id;
        this.app_id = app_id;
    }
}
