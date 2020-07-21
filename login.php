<?php

include_once "php/conexion.php";
header('Content-Type: text/txt; charset=utf-8');

session_start();

if(isset($_GET['correo']) && isset($_GET['pass'])){
    $conexion = (new Conexion())->conectar();
    $parametros = array(':correo'=>$_GET['correo'], ':pass'=>$_GET['pass']);
    $sql = "SELECT Id, User FROM `usuario` WHERE Correo = :correo AND Pass = :pass";
    $pdo = $conexion->prepare($sql);
    $pdo->execute($parametros);

    while ($row=$pdo->fetch(PDO::FETCH_ASSOC)){
        $_SESSION['userId'] = $row['Id'];
        $_SESSION['userName'] = $row['User'];
    }
}

header('Location: index.php');
exit();

?>