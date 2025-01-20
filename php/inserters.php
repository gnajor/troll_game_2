<?php

function insert_food_items($food_items, $pdo){
    $ingredients_array = [];

    foreach($food_items as $item){
        $name = $item["name"];
        $prep_method = $item["prepMethod"];
        $prep_time = $item["prepTime"];
        $rot_time = $item["rotTime"];
        $ingredients = $item["ingredients"];

        $sql = "INSERT INTO food_items (name, prep_method, prep_time, rot_time) VALUES ('$name', '$prep_method', '$prep_time', '$rot_time')";
        $pdo->exec($sql);

        foreach($ingredients as $ingredient){
            $ingredient_already_exists = array_filter($ingredients_array, fn($ingredient_item) => $ingredient_item["name"] === $ingredient["name"]);

            if(empty($ingredient_already_exists)){
                $ingredients_array[] = $ingredient;
                $name = $ingredient["name"];
                $sql = "INSERT INTO ingredients (name) VALUES ('$name')";
                $pdo->exec($sql);
            }
        }
    }
}

function insert_trolls($trolls, $pdo){
    foreach($trolls as $troll){
        $name = $troll["name"];
        $patience = $troll["patience"];

        $sql = "INSERT INTO trolls (name, patience) VALUES ('$name', '$patience')";
        $pdo->exec($sql);
    }
}

function insert_entity_ingredients($entities, $table, $entity_ingredient_table, $entity_key, $pdo){
    foreach($entities as $entity){
        $ingredients = $entity["ingredients"];
        $entity_name = $entity["name"];

        $sql = "SELECT id FROM $table WHERE name='$entity_name'";
        $stmt = $pdo->query($sql);
        $entity_received = $stmt->fetch(PDO::FETCH_ASSOC);
        $entity_id = $entity_received["id"];

        foreach($ingredients as $ingredient){
            $ingredient_name = $ingredient["name"];
            $max = $ingredient["maxAmount"];
            $min = $ingredient["minAmount"];

            $sql = "SELECT id FROM ingredients WHERE name='$ingredient_name'";
            $stmt = $pdo->query($sql);
            $ingredient_received = $stmt->fetch(PDO::FETCH_ASSOC);
            $ingredient_id = $ingredient_received["id"];

            $sql = "INSERT INTO $entity_ingredient_table (ingredient_id, $entity_key, min, max) VALUES ('$ingredient_id', '$entity_id', '$min', '$max')";
            $stmt = $pdo->exec($sql);
        }
    }
}

function insert_table_data($pdo){
    $game_data = json_decode(file_get_contents("game_data.json"), true);
    $food_items = $game_data["foodItems"];
    $trolls = $game_data["trolls"];

    insert_food_items($food_items, $pdo);
    insert_trolls($trolls, $pdo);

    insert_entity_ingredients(
        $food_items,
        "food_items", 
        "food_item_ingredients",
        "food_item_id",
        $pdo
    );

    insert_entity_ingredients(
        $trolls,
        "trolls", 
        "troll_ingredients",
        "troll_id",
        $pdo
    );
}

function insert_game_instance_on_start($pdo, $user_name){
    $sql = "SELECT id FROM users WHERE name='$user_name'";
    $stmt = $pdo->query($sql);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    $user_id = $user["id"];

    $sql = "INSERT INTO game_instances (user_id, score) VALUES ('$user_id', '0')"; //might be wrong
    $pdo->exec($sql);
}

?>