<?php
require_once("../formatters.php");
require_once("../db_com.php");
require_once("../inserters.php");
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
$pdo = get_pdo_connection();

if($request_method === "GET"){
    if (isset($_GET["userId"])) {
        $user_id = (int)$_GET["userId"];

        $stmt = $pdo->prepare("INSERT INTO game_instances (user_id) values (:user_id) RETURNING id");
        $stmt->execute(["user_id" => $user_id]);
        $game_instance = $stmt->fetch(PDO::FETCH_ASSOC);

        send_as_json(201, $game_instance["id"]);
    }
}

else if($request_method === "POST"){
    $parameters = json_decode(file_get_contents("php://input"), true);

    if(isset($parameters["gameInstanceId"], $parameters["score"], $parameters["foodItems"], $parameters["trolls"])){
        $game_instance_id = $parameters["gameInstanceId"];
        $score = $parameters["score"];
        $food_items = $parameters["foodItems"];
        $trolls = $parameters["trolls"];

        $stmt = $pdo->prepare("UPDATE game_instances SET score=:score WHERE id = :id");
        $stmt->execute([
            "score" => $score, 
            "id" => $game_instance_id
        ]);

        send_as_json(201, ["success" => "score has been added"]);
    }
}
