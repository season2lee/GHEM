package com.ssafy.ghem.user.model.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QFollower is a Querydsl query type for Follower
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QFollower extends EntityPathBase<Follower> {

    private static final long serialVersionUID = -521801473L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QFollower follower1 = new QFollower("follower1");

    public final QUser follower;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final QUser user;

    public QFollower(String variable) {
        this(Follower.class, forVariable(variable), INITS);
    }

    public QFollower(Path<? extends Follower> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QFollower(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QFollower(PathMetadata metadata, PathInits inits) {
        this(Follower.class, metadata, inits);
    }

    public QFollower(Class<? extends Follower> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.follower = inits.isInitialized("follower") ? new QUser(forProperty("follower")) : null;
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user")) : null;
    }

}

