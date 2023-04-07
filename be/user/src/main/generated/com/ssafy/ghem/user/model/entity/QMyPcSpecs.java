package com.ssafy.ghem.user.model.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QMyPcSpecs is a Querydsl query type for MyPcSpecs
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMyPcSpecs extends EntityPathBase<MyPcSpecs> {

    private static final long serialVersionUID = 2120949208L;

    public static final QMyPcSpecs myPcSpecs = new QMyPcSpecs("myPcSpecs");

    public final StringPath cpu_com = createString("cpu_com");

    public final StringPath cpu_series = createString("cpu_series");

    public final StringPath gpu_com = createString("gpu_com");

    public final StringPath gpu_name = createString("gpu_name");

    public final StringPath os = createString("os");

    public final NumberPath<Integer> ram = createNumber("ram", Integer.class);

    public final NumberPath<Long> spec_id = createNumber("spec_id", Long.class);

    public final NumberPath<Long> user_id = createNumber("user_id", Long.class);

    public QMyPcSpecs(String variable) {
        super(MyPcSpecs.class, forVariable(variable));
    }

    public QMyPcSpecs(Path<? extends MyPcSpecs> path) {
        super(path.getType(), path.getMetadata());
    }

    public QMyPcSpecs(PathMetadata metadata) {
        super(MyPcSpecs.class, metadata);
    }

}

