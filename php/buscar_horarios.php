<?php

include_once "conexion.php";
header('Content-Type: text/txt; charset=utf-8');

class Horario{

    public function buscarHorarios($consulta){
        $conexion = (new Conexion())->conectar();
        $sql = "SELECT Id, Nombre FROM `horario` WHERE Nombre LIKE '%$consulta%' AND Visible = true";
        $pdo = $conexion->prepare($sql);
        $pdo->execute();

        $json = array();

        while ($row=$pdo->fetch(PDO::FETCH_ASSOC)){
            $json[] = array('id' => $row['Id'], 'nombre' => $row['Nombre']);
        }
            echo json_encode($json);
    }
}

($horario = new Horario())->buscarHorarios($_GET['consulta']);

?>