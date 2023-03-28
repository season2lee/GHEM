package com.ssafy.ghem.user.model.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QGpu is a Querydsl query type for Gpu
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QGpu extends EntityPathBase<Gpu> {

    private static final long serialVersionUID = 853538603L;

    public static final QGpu gpu = new QGpu("gpu");

    public final NumberPath<Integer> benchmark = createNumber("benchmark", Integer.class);

    public final StringPath brand = createString("brand");

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final StringPath model = createString("model");

    public final StringPath part_number = createString("part_number");

    public final NumberPath<Integer> ranking = createNumber("ranking", Integer.class);

    public final NumberPath<Integer> samples = createNumber("samples", Integer.class);

    public final StringPath type = createString("type");

    public final StringPath url = createString("url");

    public QGpu(String variable) {
        super(Gpu.class, forVariable(variable));
    }

    public QGpu(Path<? extends Gpu> path) {
        super(path.getType(), path.getMetadata());
    }

    public QGpu(PathMetadata metadata) {
        super(Gpu.class, metadata);
    }

}

