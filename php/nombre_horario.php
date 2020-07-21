<?php

include_once "conexion.php";
header('Content-Type: text/txt; charset=utf-8');

class Horario{

    public function obtenerNombre($idHorario){
        $conexion = (new Conexion())->conectar();
        $parametros = array(':idHorario'=>$idHorario);
        $sql = "SELECT Nombre FROM `horario` WHERE Id = :idHorario";
        $pdo = $conexion->prepare($sql);
        $pdo->execute($parametros);

        $json = array();

        while ($row=$pdo->fetch(PDO::FETCH_ASSOC)){
            $json[] = array('nombre' => $row['Nombre']);
        }
            echo json_encode($json);
    }
}

($horario = new Horario())->obtenerNombre($_GET['idHorario']);

?>