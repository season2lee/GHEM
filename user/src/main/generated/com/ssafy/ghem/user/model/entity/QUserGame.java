package com.ssafy.ghem.user.model.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUserGame is a Querydsl query type for UserGame
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUserGame extends EntityPathBase<UserGame> {

    private static final long serialVersionUID = -1090478274L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QUserGame userGame = new QUserGame("userGame");

    public final StringPath content = createString("content");

    public final QGame game;

    public final NumberPath<Integer> rating = createNumber("rating", Integer.class);

    public final DateTimePath<java.time.LocalDateTime> updateDate = createDateTime("updateDate", java.time.LocalDateTime.class);

    public final QUser user;

    public final NumberPath<Long> userGameId = createNumber("userGameId", Long.class);

    public QUserGame(String variable) {
        this(UserGame.class, forVariable(variable), INITS);
    }

    public QUserGame(Path<? extends UserGame> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QUserGame(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QUserGame(PathMetadata metadata, PathInits inits) {
        this(UserGame.class, metadata, inits);
    }

    public QUserGame(Class<? extends UserGame> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.game = inits.isInitialized("game") ? new QGame(forProperty("game")) : null;
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user")) : null;
    }

}

