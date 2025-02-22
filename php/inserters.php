<?php

function insert_food_items($food_items, $pdo){
    $ingredients_array = [];

    foreach($food_items as $item){
        $name = $item["name"];
        $prep_method = $item["prepMethod"];
        $prep_time = $item["prepTime"];
        $rot_time = $item["rotTime"];
        $dispose_time = $item["disposeTime"];
        $ingredients = $item["ingredients"];

        $sql = "INSERT INTO Food_item (name, prep_method, prep_time, rot_time, dispose_time) VALUES ('$name', '$prep_method', '$prep_time', '$rot_time', '$dispose_time')";
        $pdo->exec($sql);

        foreach($ingredients as $ingredient){
            $ingredient_already_exists = array_filter($ingredients_array, fn($ingredient_item) => $ingredient_item["name"] === $ingredient["name"]);

            if(empty($ingredient_already_exists)){
                $ingredients_array[] = $ingredient;
                $name = $ingredient["name"];
                $sql = "INSERT INTO Ingredient (name) VALUES ('$name')";
                $pdo->exec($sql);
            }
        }
    }
}

function insert_trolls($trolls, $pdo){
    foreach($trolls as $troll){
        $name = $troll["name"];

        $sql = "INSERT INTO Troll (name) VALUES ('$name')";
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
            $amount = rand($min, $max);

            $sql = "SELECT id FROM Ingredient WHERE name='$ingredient_name'";
            $stmt = $pdo->query($sql);
            $ingredient_received = $stmt->fetch(PDO::FETCH_ASSOC);
            $ingredient_id = $ingredient_received["id"];

            $sql = "INSERT INTO $entity_ingredient_table (ingredient_id, $entity_key, amount) VALUES ('$ingredient_id', '$entity_id', '$amount')";
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
        "Food_item", 
        "Food_item_contains",
        "food_item_id",
        $pdo
    );

    insert_entity_ingredients(
        $trolls,
        "Troll", 
        "Troll_wants",
        "troll_id",
        $pdo
    );

    insert_game_mode_content($food_items, "food", $pdo);
    insert_game_mode_content($trolls, "troll", $pdo);
}

function insert_game_mode_content($data, $entity, $pdo){
    $sql = "SELECT id FROM Game";
    $stmt = $pdo->query($sql);
    $ids = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach($ids as $id){
        $game_id = $id["id"];
        shuffle($data);

        if($entity === "troll"){
            $main_table = "Game_has_troll";
            $sec_table = "Troll";
            $entity_id = "troll_id";
        }
        else if($entity === "food"){
            $main_table = "Game_has_food";
            $sec_table = "Food_item";
            $entity_id = "food_item_id";
        }
        else{
            return;
        }

        for($i = 0; $i < round(count($data) * 0.75); $i++){ //make more or remove less
            $item = $data[$i];
            $item_name = $item["name"];

            $sql = "SELECT id FROM $sec_table WHERE name='$item_name'";
            $stmt = $pdo->query($sql);
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            $item_id = $result["id"];

            $sql = "INSERT INTO $main_table (game_id, $entity_id) VALUES ($game_id, $item_id)";
            $pdo->exec($sql);
        }
    }
}

function insert_game_instance_on_start($pdo, $user_name){
    $sql = "SELECT id FROM users WHERE name='$user_name'";
    $stmt = $pdo->query($sql);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    $user_id = $user["id"];

    $sql = "INSERT INTO Game_instance (user_id) VALUES ('$user_id')";
    $pdo->exec($sql);
}
?>