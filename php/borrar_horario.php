<?php

include_once "conexion.php";
header('Content-Type: text/txt; charset=utf-8');

class Horario{

    public function borrarHorario($idHorario){
        $conexion = (new Conexion())->conectar();
        $parametros = array(':idHorario'=>$idHorario);
        $sql = "DELETE FROM `horario` WHERE Id = :idHorario";
        $pdo = $conexion->prepare($sql);
        $pdo->execute($parametros);

        echo "Horario eliminado";
    }
}

($horario = new Horario())->borrarHorario($_GET['idHorario']);

?>