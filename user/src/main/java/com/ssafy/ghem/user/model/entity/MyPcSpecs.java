package com.ssafy.ghem.user.model.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name="mypcspecs")
public class MyPcSpecs {
    @Id @GeneratedValue
    @Column(name = "spec_id")
    private Long spec_id;
    private String cpu_com;
    private String cpu_series;
    private Integer cpu_gen;
    private String gpu_com;
    private String gpu_name;
    private Integer ram;
    private String os;
    private Long user_id;

    @Builder
    public MyPcSpecs(Long spec_id, String cpu_com, String cpu_series, Integer cpu_gen, String gpu_com, String gpu_name, Integer ram, String os, Long user_id) {
        this.spec_id = spec_id;
        this.cpu_com = cpu_com;
        this.cpu_series = cpu_series;
        this.cpu_gen = cpu_gen;
        this.gpu_com = gpu_com;
        this.gpu_name = gpu_name;
        this.ram = ram;
        this.os = os;
        this.user_id = user_id;
    }
}
