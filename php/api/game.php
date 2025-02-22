<?php
require_once("../formatters.php");
require_once("../db_com.php");
require_once("../utils.php");


if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");
    header("Access-Control-Allow-Origin: *");
    exit();
} else {
    header("Access-Control-Allow-Origin: *");
}

$request_method = $_SERVER["REQUEST_METHOD"];

if($request_method !== "GET"){
    send_as_json(405, ["error" => "method is not allowed"]);
}

if(!isset($_GET["game"])){
    send_as_json(400, ["error" => "url parameter is invalid"]);
}

if($_GET["game"] === "1" || $_GET["game"] === "2" || $_GET["game"] === "3"){
    $game_id = intval($_GET["game"]);
    $pdo = get_pdo_connection();
    $game_data = [];
    
    $sql = "SELECT 
                T.id,
                T.name,
                GROUP_CONCAT(I.id) AS ingredient_ids,
                GROUP_CONCAT(I.name) AS ingredient_names,
                GROUP_CONCAT(Tw.amount) AS ingredient_amounts
            FROM Troll T
            JOIN Game_has_troll Ght ON Ght.game_id = :game_id AND Ght.troll_id = T.id
            JOIN Troll_wants Tw ON Tw.troll_id = T.id
            JOIN Ingredient I ON I.id = Tw.ingredient_id
            GROUP BY T.id";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        "game_id" => $game_id
    ]);
    
    $trolls = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $trolls_formatted = format_and_insert_data($trolls, "trolls");

    $sql = "SELECT
                Fi.id,
                Fi.name,
                Fi.prep_method,
                Fi.prep_time,
                Fi.rot_time,
                Fi.dispose_time,
                GROUP_CONCAT(I.id) AS ingredient_ids,
                GROUP_CONCAT(I.name) AS ingredient_names,
                GROUP_CONCAT(Fic.amount) AS ingredient_amounts
            FROM Food_item Fi
            JOIN Game_has_food Ghf ON Ghf.game_id = $game_id
            JOIN Food_item_contains Fic ON Fic.food_item_id = Fi.id AND Ghf.food_item_id = Fi.id
            JOIN Ingredient I ON I.id = Fic.ingredient_id
            GROUP BY Fi.id";

    $stmt = $pdo->query($sql);
    $food = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $food_formatted = format_and_insert_data($food, "food");

    $game_data["trolls"] = $trolls_formatted;
    $game_data["food"] = $food_formatted;

    send_as_json(200, $game_data);
}




