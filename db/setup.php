<?php 
require_once("../php/db_com.php");
require_once("../php/inserters.php");

try{
    $pdo = get_pdo_connection();
    $sql = file_get_contents("db.sql");
    $pdo->exec($sql);

    insert_table_data($pdo);
}
catch(PDOException $e){
    echo "Error: " . $e->getMessage();
}