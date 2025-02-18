<?php
require_once("../formatters.php");
require_once("../db_com.php");

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

if(!isset($_GET["foodItems"])){
    send_as_json(400, ["error" => "url parameter is invalid"]);
}

if($_GET["foodItems"] === "all"){
    $pdo = get_pdo_connection();

    $sql = "SELECT fi.id,
                fi.name,  
                fi.prep_method, 
                fi.prep_time, 
                fi.rot_time,
                fi.dispose_time,
                GROUP_CONCAT(i.id) as ingredient_ids, 
                GROUP_CONCAT(i.name) as ingredient_names, 
                GROUP_CONCAT(ABS(RANDOM()) % (fii.max - fii.min + 1) + fii.min) AS ingredient_amounts 
            FROM food_items fi
            LEFT JOIN food_item_ingredients fii ON fi.id = fii.food_item_id
            LEFT JOIN ingredients i ON i.id = fii.ingredient_id
            GROUP BY fi.id"; 

    $stmt = $pdo->query($sql);
    $food = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $formatted_food_items_1 = format_and_insert_data($food, "food");

    send_as_json(200, $formatted_food_items_1);
}


function send_as_json($status, $data = []){
    header("Content-Type: application/json");
    http_response_code($status);
    echo json_encode($data, JSON_PRETTY_PRINT);
    exit(); 
}

