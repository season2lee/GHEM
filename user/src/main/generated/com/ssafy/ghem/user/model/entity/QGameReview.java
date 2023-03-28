package com.ssafy.ghem.user.model.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QGameReview is a Querydsl query type for GameReview
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QGameReview extends EntityPathBase<GameReview> {

    private static final long serialVersionUID = -623112565L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QGameReview gameReview = new QGameReview("gameReview");

    public final StringPath content = createString("content");

    public final StringPath date = createString("date");

    public final QGame game;

    public final NumberPath<Long> review_id = createNumber("review_id", Long.class);

    public final QUser user;

    public final QUserGame userGame;

    public QGameReview(String variable) {
        this(GameReview.class, forVariable(variable), INITS);
    }

    public QGameReview(Path<? extends GameReview> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QGameReview(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QGameReview(PathMetadata metadata, PathInits inits) {
        this(GameReview.class, metadata, inits);
    }

    public QGameReview(Class<? extends GameReview> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.game = inits.isInitialized("game") ? new QGame(forProperty("game")) : null;
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user")) : null;
        this.userGame = inits.isInitialized("userGame") ? new QUserGame(forProperty("userGame"), inits.get("userGame")) : null;
    }

}

