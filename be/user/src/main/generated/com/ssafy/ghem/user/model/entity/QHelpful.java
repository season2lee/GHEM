package com.ssafy.ghem.user.model.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QHelpful is a Querydsl query type for Helpful
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QHelpful extends EntityPathBase<Helpful> {

    private static final long serialVersionUID = 1749088667L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QHelpful helpful = new QHelpful("helpful");

    public final NumberPath<Long> HelpfulId = createNumber("HelpfulId", Long.class);

    public final QUserGame userGame;

    public final NumberPath<Long> userId = createNumber("userId", Long.class);

    public QHelpful(String variable) {
        this(Helpful.class, forVariable(variable), INITS);
    }

    public QHelpful(Path<? extends Helpful> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QHelpful(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QHelpful(PathMetadata metadata, PathInits inits) {
        this(Helpful.class, metadata, inits);
    }

    public QHelpful(Class<? extends Helpful> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.userGame = inits.isInitialized("userGame") ? new QUserGame(forProperty("userGame"), inits.get("userGame")) : null;
    }

}

