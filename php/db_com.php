<?php 

function get_pdo_connection(){
    static $pdo = null;

    if($pdo === null){
        try{
            $path = __DIR__ . "/../db/db.sqlite";
            $pdo = new PDO("sqlite:" . $path);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 
        }
        catch(PDOException $e){
            echo "Error: " . $e->getMessage();
        }
    }
    return $pdo;
}