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

        $sql = "INSERT INTO food_items (name, prep_method, prep_time, rot_time, dispose_time) VALUES ('$name', '$prep_method', '$prep_time', '$rot_time', '$dispose_time')";
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

        $sql = "INSERT INTO trolls (name) VALUES ('$name')";
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

    $sql = "INSERT INTO game_instances (user_id) VALUES ('$user_id')";
    $pdo->exec($sql);
}


function insert_game_instance_data($game_instance_id, $type, $data, $pdo){
    foreach($data as $item){
        $item_name = $item["name"];
        $ingredients = $item["ingredients"];
    
        if($type === "troll"){
            $main_table = "trolls";
            $link_table = "game_instance_trolls";
            $ingredient_table = "game_instance_troll_ingredients";
            $id_column = "troll_id";
        }
        else if($type === "food"){
            $main_table = "food_items";
            $link_table = "game_instance_food_items";
            $ingredient_table = "game_instance_food_item_ingredients";
            $id_column = "food_item_id";
        }

        $sql = "SELECT id FROM $main_table WHERE name='$item_name'";
        $stmt = $pdo->query($sql);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        $item_id = $result["id"];
        
        $stmt = $pdo->prepare("INSERT INTO $link_table (game_instance_id, $id_column) VALUES (:game_instance_id, :item_id)");
        $stmt->execute([
            "game_instance_id" => $game_instance_id,
            "item_id" => $item_id
        ]);

        foreach($ingredients as $ingredient){
            $ingredient_name = $ingredient["name"];
            $ingredient_amount = $ingredient["amount"];

            $stmt = $pdo->query("SELECT id FROM ingredients WHERE name='$ingredient_name'");
            $resulted_ingredient = $stmt->fetch(PDO::FETCH_ASSOC);
            $ingredient_id = $resulted_ingredient["id"];

            $stmt = $pdo->prepare("INSERT INTO $ingredient_table (ingredient_id, game_instance_id, $id_column, amount) VALUES (:ingredient_id, :game_instance_id, :item_id, :amount)");
            $stmt->execute([
                "game_instance_id" => $game_instance_id,
                "ingredient_id" => $ingredient_id,
                "item_id" => $item_id,
                "amount" => $ingredient_amount
            ]);
        }
    }
}


?>