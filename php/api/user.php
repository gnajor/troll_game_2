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

$pdo = get_pdo_connection();

if($parameters["name"] === "guest"){
    $name = $parameters["name"] . "_" . uniqid();
    $password = $parameters["password"];

    $stmt = $pdo->prepare("INSERT INTO users (name, password) VALUES (:name, :password) RETURNING id");
    $stmt->execute(["name" => $name, "password" => $password]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    send_as_json(201,  $user["id"]);
}
else{
    $name = $parameters["name"];
    $password = $parameters["password"];

    $stmt = $pdo->prepare("SELECT name FROM users WHERE name=:name");
    $stmt->execute(["name" => $name]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if($user){
        send_as_json(400, ["error" => "user already exists"]);
    }

    $stmt = $pdo->prepare("INSERT INTO users (name, password) VALUES (:name, :password)");
    $stmt->execute(["name" => $name, "password" => $password]);
    send_as_json(201, ["success" => "user added"]);
}

function send_as_json($status, $data = []){
    header("Content-Type: application/json");
    http_response_code($status);
    echo json_encode($data, JSON_PRETTY_PRINT);
    exit(); 
}