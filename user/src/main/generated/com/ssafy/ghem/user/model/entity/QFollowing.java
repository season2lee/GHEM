package com.ssafy.ghem.user.model.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QFollowing is a Querydsl query type for Following
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QFollowing extends EntityPathBase<Following> {

    private static final long serialVersionUID = 1004027344L;

    public static final QFollowing following = new QFollowing("following");

    public final NumberPath<Long> followingId = createNumber("followingId", Long.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Long> userId = createNumber("userId", Long.class);

    public QFollowing(String variable) {
        super(Following.class, forVariable(variable));
    }

    public QFollowing(Path<? extends Following> path) {
        super(path.getType(), path.getMetadata());
    }

    public QFollowing(PathMetadata metadata) {
        super(Following.class, metadata);
    }

}

