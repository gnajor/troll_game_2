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

if($request_method !== "POST"){
    send_as_json(405, ["error" => "method is not allowed"]);
}

$parameters = json_decode(file_get_contents("php://input"), true);

if(!isset($parameters["name"], $parameters["password"])){
    send_as_json(400, ["error" => "parameters are invalid"]);
}

$name = $parameters["name"];
$password = $parameters["password"];
$pdo = get_pdo_connection();

$stmt = $pdo->prepare("SELECT password, name, id FROM users WHERE password=:password AND name=:name");
$stmt->execute(["password" => $password, "name" => $name]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if(!$user){
    send_as_json(404, ["error" => "user does not exist"]);
}

send_as_json(200, $user);

function send_as_json($status, $data = []){
    header("Content-Type: application/json");
    http_response_code($status);
    echo json_encode($data, JSON_PRETTY_PRINT);
    exit(); 
}