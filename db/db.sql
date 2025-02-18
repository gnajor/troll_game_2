PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS Game(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name CHAR(6) NOT NULL UNIQUE CHECK(name IN ('Mode 1', 'Mode 2', 'Mode 3')) 
);

CREATE TABLE IF NOT EXISTS Troll(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(20) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS Food_item(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(20) NOT NULL UNIQUE,
    prep_method VARCHAR(20) NOT NULL,
    prep_time INTEGER NOT NULL,
    rot_time INTEGER NOT NULL,
    dispose_time INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS Ingredient(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(20) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS Food_item_contains(
    food_item_id INTEGER NOT NULL,
    ingredient_id INTEGER NOT NULL,
    amount INTEGER NOT NULL,

    PRIMARY KEY (food_item_id, ingredient_id),
    FOREIGN KEY (food_item_id) REFERENCES Food_item (id) ON DELETE CASCADE,
    FOREIGN KEY (ingredient_id) REFERENCES Ingredient (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Troll_wants(
    ingredient_id INTEGER NOT NULL,
    troll_id INTEGER NOT NULL,
    amount INTEGER NOT NULL,

    PRIMARY KEY (ingredient_id, troll_id),
    FOREIGN KEY (troll_id) REFERENCES Troll (id) ON DELETE CASCADE,
    FOREIGN KEY (ingredient_id) REFERENCES Ingredient (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Game_has_food(
    game_id INTEGER,
    food_item_id INTEGER,

    PRIMARY KEY (game_id, food_item_id),
    FOREIGN KEY (food_item_id) REFERENCES Food_item (id) ON DELETE CASCADE,
    FOREIGN KEY (game_id) REFERENCES Game (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Game_has_troll(
    game_id INTEGER,
    troll_id INTEGER,

    PRIMARY KEY (game_id, troll_id),
    FOREIGN KEY (troll_id) REFERENCES Troll (id) ON DELETE CASCADE,
    FOREIGN KEY (game_id) REFERENCES Game (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS User(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(20) NOT NULL UNIQUE,
    password VARCHAR(64) NOT NULL
);

CREATE TABLE IF NOT EXISTS Game_instance(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    game_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    score INTEGER,

    FOREIGN KEY (user_id) REFERENCES User (id) ON DELETE CASCADE,
    FOREIGN KEY (game_id) REFERENCES Game (id) ON DELETE CASCADE
);

