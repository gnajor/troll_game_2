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

if(!isset($_GET["trolls"])){
    send_as_json(400, ["error" => "url parameter is invalid"]);
}

if($_GET["trolls"] === "all"){
    $pdo = get_pdo_connection();

    $sql = "SELECT t.id,
                t.name,
                GROUP_CONCAT(i.id) AS ingredient_ids,
                GROUP_CONCAT(i.name) AS ingredient_names,
                GROUP_CONCAT(ABS(RANDOM()) % (ti.max - ti.min + 1) + ti.min) AS ingredient_amounts 
            FROM trolls t
            LEFT JOIN troll_ingredients ti ON t.id = ti.troll_id
            LEFT JOIN ingredients i ON i.id = ti.ingredient_id
            GROUP BY t.id";

    $stmt = $pdo->query($sql);
    $trolls = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $formatted_trolls = format_and_insert_data($trolls, "trolls");
    send_as_json(200, $formatted_trolls);
}

function send_as_json($status, $data = []){
    header("Content-Type: application/json");
    http_response_code($status);
    echo json_encode($data, JSON_PRETTY_PRINT);
    exit(); 
}