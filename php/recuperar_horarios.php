<?php

include_once "conexion.php";
header('Content-Type: text/txt; charset=utf-8');

class Horario{

    public function recuperarHorarios($userId){
        $conexion = (new Conexion())->conectar();
        $sql = "SELECT Id, Nombre, Visible FROM `horario` WHERE Propietario = $userId";
        $pdo = $conexion->prepare($sql);
        $pdo->execute();

        $json = array();

        while ($row=$pdo->fetch(PDO::FETCH_ASSOC)){
            $json[] = array('id' => $row['Id'], 'nombre' => $row['Nombre'], 'visible' => $row['Visible']);
        }
            echo json_encode($json);
    }
}

($horario = new Horario())->recuperarHorarios($_GET['userId']);

?>