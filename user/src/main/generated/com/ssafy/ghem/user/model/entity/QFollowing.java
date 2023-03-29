package com.ssafy.ghem.user.model.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QFollowing is a Querydsl query type for Following
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QFollowing extends EntityPathBase<Following> {

    private static final long serialVersionUID = 1004027344L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QFollowing following1 = new QFollowing("following1");

    public final QUser following;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final QUser user;

    public QFollowing(String variable) {
        this(Following.class, forVariable(variable), INITS);
    }

    public QFollowing(Path<? extends Following> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QFollowing(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QFollowing(PathMetadata metadata, PathInits inits) {
        this(Following.class, metadata, inits);
    }

    public QFollowing(Class<? extends Following> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.following = inits.isInitialized("following") ? new QUser(forProperty("following")) : null;
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user")) : null;
    }

}

