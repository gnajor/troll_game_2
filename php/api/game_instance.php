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
    if(isset($_GET["userId"], $_GET["game"])){
        $user_id = (int)$_GET["userId"];
        $game_id = (int)$_GET["game"];

        $stmt = $pdo->prepare("INSERT INTO Game_instance (user_id, game_id) values (:user_id, :game_id) RETURNING id");
        $stmt->execute([
            "user_id" => $user_id,
            "game_id" => $game_id
    
        ]);
        $game_instance = $stmt->fetch(PDO::FETCH_ASSOC);

        send_as_json(201, $game_instance["id"]);
    }
    else if(isset($_GET["game"], $_GET["score"])){
        if($_GET["score"] === "all"){
            $game_id = $_GET["game"];

            $sql = "SELECT 
                        U.name,
                        Gi.score
                    FROM Game_instance AS Gi
                    JOIN User AS U ON U.id = Gi.user_id
                    WHERE Gi.game_id = :game_id AND Gi.score IS NOT NULL
                    ORDER BY Gi.score DESC";

            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                "game_id" => $game_id
            ]);

            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
            send_as_json(200, $users);
        }
    }
}

else if($request_method === "POST"){
    $parameters = json_decode(file_get_contents("php://input"), true);

    if(isset($parameters["gameInstanceId"], $parameters["score"])){
        $game_instance_id = $parameters["gameInstanceId"];
        $score = $parameters["score"];

        $stmt = $pdo->prepare("UPDATE Game_instance SET score=:score WHERE id = :id");
        $stmt->execute([
            "score" => $score, 
            "id" => $game_instance_id
        ]);

        send_as_json(201, ["success" => "score has been added"]);
    }
}
