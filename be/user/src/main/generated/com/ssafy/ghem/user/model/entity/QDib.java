package com.ssafy.ghem.user.model.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QDib is a Querydsl query type for Dib
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QDib extends EntityPathBase<Dib> {

    private static final long serialVersionUID = 853535484L;

    public static final QDib dib = new QDib("dib");

    public final NumberPath<Long> app_id = createNumber("app_id", Long.class);

    public final NumberPath<Long> dibs_id = createNumber("dibs_id", Long.class);

    public final NumberPath<Long> user_id = createNumber("user_id", Long.class);

    public QDib(String variable) {
        super(Dib.class, forVariable(variable));
    }

    public QDib(Path<? extends Dib> path) {
        super(path.getType(), path.getMetadata());
    }

    public QDib(PathMetadata metadata) {
        super(Dib.class, metadata);
    }

}

