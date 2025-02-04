PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(64) NOT NULL UNIQUE,
    password VARCHAR(64) NOT NULL
);

CREATE TABLE IF NOT EXISTS game_instances(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    score INTEGER DEFAULT 0,

    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS trolls(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(64) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS food_items(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(64) NOT NULL UNIQUE,
    prep_method VARCHAR(64) NOT NULL,
    prep_time INTEGER NOT NULL,
    rot_time INTEGER NOT NULL,
    dispose_time INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS ingredients(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(64) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS food_item_ingredients(
    food_item_id INTEGER NOT NULL,
    ingredient_id INTEGER NOT NULL,
    min INTEGER NOT NULL,
    max INTEGER NOT NULL,

    PRIMARY KEY (food_item_id, ingredient_id),
    FOREIGN KEY (food_item_id) REFERENCES food_items (id) ON DELETE CASCADE,
    FOREIGN KEY (ingredient_id) REFERENCES ingredients (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS troll_ingredients(
    ingredient_id INTEGER NOT NULL,
    troll_id INTEGER NOT NULL,
    min INTEGER NOT NULL,
    max INTEGER NOT NULL,

    PRIMARY KEY (ingredient_id, troll_id),
    FOREIGN KEY (troll_id) REFERENCES trolls (id) ON DELETE CASCADE,
    FOREIGN KEY (ingredient_id) REFERENCES ingredients (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS game_instance_food_items(
    food_item_id INTEGER NOT NULL,
    game_instance_id INTEGER NOT NULL,

    PRIMARY KEY (game_instance_id, food_item_id),
    FOREIGN KEY (food_item_id) REFERENCES food_items (id) ON DELETE CASCADE,
    FOREIGN KEY (game_instance_id) REFERENCES game_instances (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS game_instance_trolls(
    troll_id INTEGER NOT NULL,
    game_instance_id INTEGER NOT NULL,

    PRIMARY KEY (game_instance_id, troll_id),
    FOREIGN KEY (troll_id) REFERENCES trolls (id) ON DELETE CASCADE,
    FOREIGN KEY (game_instance_id) REFERENCES game_instances (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS game_instance_troll_ingredients(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    game_instance_id INTEGER NOT NULL,
    ingredient_id INTEGER NOT NULL,
    troll_id INTEGER NOT NULL,
    amount INTEGER NOT NULL,

    FOREIGN KEY (game_instance_id) REFERENCES game_instances (id) ON DELETE CASCADE,
    FOREIGN KEY (ingredient_id) REFERENCES ingredients (id) ON DELETE CASCADE,
    FOREIGN KEY (troll_id) REFERENCES trolls (id) ON DELETE CASCADE 
);

CREATE TABLE IF NOT EXISTS game_instance_food_item_ingredients(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    game_instance_id INTEGER NOT NULL,
    ingredient_id INTEGER NOT NULL,
    food_item_id INTEGER NOT NULL,
    amount INTEGER NOT NULL,

    FOREIGN KEY (game_instance_id) REFERENCES game_instances (id) ON DELETE CASCADE,
    FOREIGN KEY (ingredient_id) REFERENCES ingredients (id) ON DELETE CASCADE,
    FOREIGN KEY (food_item_id) REFERENCES food_items (id) ON DELETE CASCADE 
);