<?php

include_once "conexion.php";
header('Content-Type: text/txt; charset=utf-8');

class Horario{

    public function crearHorario($userId, $nombre){
        $conexion = (new Conexion())->conectar();
        $parametros = array(':userId'=>$userId, ':nombre'=>$nombre);
        $sql = "INSERT INTO `horario` VALUES (NULL, :nombre, :userId, 0)";
        $pdo = $conexion->prepare($sql);
        $pdo->execute($parametros);

        echo "Horario creado";
    }
}

($horario = new Horario())->crearHorario($_GET['userId'], $_GET['nombre']);

?>