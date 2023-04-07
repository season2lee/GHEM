package com.ssafy.ghem.user.model.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QGame is a Querydsl query type for Game
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QGame extends EntityPathBase<Game> {

    private static final long serialVersionUID = 689878355L;

    public static final QGame game = new QGame("game");

    public final NumberPath<Long> appId = createNumber("appId", Long.class);

    public final StringPath genre = createString("genre");

    public final NumberPath<Integer> negative_reviews = createNumber("negative_reviews", Integer.class);

    public final NumberPath<Integer> positive_reviews = createNumber("positive_reviews", Integer.class);

    public final NumberPath<Integer> rating = createNumber("rating", Integer.class);

    public final StringPath rating_desc = createString("rating_desc");

    public final StringPath release_date = createString("release_date");

    public final StringPath title = createString("title");

    public QGame(String variable) {
        super(Game.class, forVariable(variable));
    }

    public QGame(Path<? extends Game> path) {
        super(path.getType(), path.getMetadata());
    }

    public QGame(PathMetadata metadata) {
        super(Game.class, metadata);
    }

}

