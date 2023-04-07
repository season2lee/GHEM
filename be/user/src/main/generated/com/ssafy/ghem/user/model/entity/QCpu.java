package com.ssafy.ghem.user.model.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QCpu is a Querydsl query type for Cpu
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCpu extends EntityPathBase<Cpu> {

    private static final long serialVersionUID = 853534759L;

    public static final QCpu cpu = new QCpu("cpu");

    public final NumberPath<Integer> benchmark = createNumber("benchmark", Integer.class);

    public final StringPath brand = createString("brand");

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final StringPath model = createString("model");

    public final StringPath part_number = createString("part_number");

    public final NumberPath<Integer> ranking = createNumber("ranking", Integer.class);

    public final NumberPath<Integer> samples = createNumber("samples", Integer.class);

    public final StringPath type = createString("type");

    public final StringPath url = createString("url");

    public QCpu(String variable) {
        super(Cpu.class, forVariable(variable));
    }

    public QCpu(Path<? extends Cpu> path) {
        super(path.getType(), path.getMetadata());
    }

    public QCpu(PathMetadata metadata) {
        super(Cpu.class, metadata);
    }

}

