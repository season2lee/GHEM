package com.ssafy.ghem.user.model.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name="gpu")
public class Gpu {
    @Id
    private Integer id;
    private String type;
    private String part_number;
    private String brand;
    private String model;
    private Integer ranking;
    private Integer benchmark;
    private Integer samples;
    private String url;

    @Builder
    public Gpu(Integer id, String type, String part_number, String brand, String model, Integer ranking, Integer benchmark, Integer samples, String url) {
        this.id = id;
        this.type = type;
        this.part_number = part_number;
        this.brand = brand;
        this.model = model;
        this.ranking = ranking;
        this.benchmark = benchmark;
        this.samples = samples;
        this.url = url;
    }
}
