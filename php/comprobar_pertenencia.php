<?php

include_once "conexion.php";
header('Content-Type: text/txt; charset=utf-8');

class Horario{

    public function comprobarPertenencia($idHorario, $userId){
        $conexion = (new Conexion())->conectar();
        $parametros = array(':idHorario'=>$idHorario, ':userId'=>$userId);
        $sql = "SELECT 1 FROM `horario` WHERE Id = :idHorario AND Propietario = :userId";
        $pdo = $conexion->prepare($sql);
        $pdo->execute($parametros);

        $json = array();

        while ($row=$pdo->fetch(PDO::FETCH_ASSOC)){
            $json[] = array('resultado' => $row['1']);
        }
            echo json_encode($json);
    }
}

($horario = new Horario())->comprobarPertenencia($_GET['idHorario'], $_GET['userId']);

?>