<?php 
require_once("../php/db_com.php");
require_once("../php/inserters.php");

try{
    $pdo = get_pdo_connection();
    $sql = file_get_contents("db.sql");

    $sql .= "INSERT INTO Game (id, name) VALUES 
    (1, 'Mode 1'),
    (2, 'Mode 2'),
    (3, 'Mode 3')";

    $pdo->exec($sql);

    insert_table_data($pdo);
}

catch(PDOException $e){
    echo "Error: " . $e->getMessage();
}