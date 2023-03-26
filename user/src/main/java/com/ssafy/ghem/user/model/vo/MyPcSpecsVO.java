package com.ssafy.ghem.user.model.vo;

import lombok.Data;

@Data
public class MyPcSpecsVO {
    private Long spec_id;
    private String cpu_com;
    private String cpu_series;
    private int cpu_gen;
    private String gpu_com;
    private String gpu_name;
    private int ram;
    private String os;
    private Long user_id;
}
