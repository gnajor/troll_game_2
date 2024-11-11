<?php
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");
    header("Access-Control-Allow-Origin: *");
    exit();
} else {
    header("Access-Control-Allow-Origin: *");
}

$allowed_methods = ["POST", "GET"];
$request_method = $_SERVER["REQUEST_METHOD"];

if(!in_array($request_method, $allowed_methods)){
    send_as_json(501, ["error" => "The request method is not acceptable"]);
}

if($request_method === "POST"){
    $pantries = json_decode(file_get_contents("php://input"), true);

    if(!is_array($pantries)){
        send_as_json(400, ["error" => "The request data is not an array"]);
    }

    foreach($pantries as $index => $pantry){
        $name = $index + 1;
        file_put_contents("./db/pantry_$name.json", json_encode($pantry, JSON_PRETTY_PRINT));
    }
    send_as_json(201, [
        "success" => "Pantries was created",
        "resource" => $pantries
    ]);
}

if($request_method === "GET"){
    $param = $_GET["pantry"];

    if(isset($param)){
        $pantry = json_decode(file_get_contents("./db/pantry_$param.json"), true);
        send_as_json(200, $pantry);
    }
}

function send_as_json($status, $data = []){
    header("Content-Type: application/json");
    http_response_code($status);
    echo json_encode($data, JSON_PRETTY_PRINT);
    exit(); 
}


?>