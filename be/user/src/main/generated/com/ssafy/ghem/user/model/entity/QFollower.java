package com.ssafy.ghem.user.model.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QFollower is a Querydsl query type for Follower
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QFollower extends EntityPathBase<Follower> {

    private static final long serialVersionUID = -521801473L;

    public static final QFollower follower = new QFollower("follower");

    public final NumberPath<Long> followerId = createNumber("followerId", Long.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final BooleanPath isFollowing = createBoolean("isFollowing");

    public final NumberPath<Long> userId = createNumber("userId", Long.class);

    public QFollower(String variable) {
        super(Follower.class, forVariable(variable));
    }

    public QFollower(Path<? extends Follower> path) {
        super(path.getType(), path.getMetadata());
    }

    public QFollower(PathMetadata metadata) {
        super(Follower.class, metadata);
    }

}

