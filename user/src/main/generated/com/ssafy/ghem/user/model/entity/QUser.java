package com.ssafy.ghem.user.model.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUser extends EntityPathBase<User> {

    private static final long serialVersionUID = 690312492L;

    public static final QUser user = new QUser("user");

    public final StringPath id = createString("id");

    public final StringPath introduce = createString("introduce");

    public final StringPath nickname = createString("nickname");

    public final StringPath steamId = createString("steamId");

    public final NumberPath<Long> userId = createNumber("userId", Long.class);

    public final StringPath userProfile = createString("userProfile");

    public QUser(String variable) {
        super(User.class, forVariable(variable));
    }

    public QUser(Path<? extends User> path) {
        super(path.getType(), path.getMetadata());
    }

    public QUser(PathMetadata metadata) {
        super(User.class, metadata);
    }

}

