<?php

include_once "conexion.php";
header('Content-Type: text/txt; charset=utf-8');

class Horario{

    public function obtenerHorario($idHorario){
        $conexion = (new Conexion())->conectar();
        $parametros = array(':horario'=>$idHorario);
        $sql = "SELECT * FROM `evento` WHERE Horario = :horario";
        $pdo = $conexion->prepare($sql);
        $pdo->execute($parametros);

        $json = array();

        while ($row=$pdo->fetch(PDO::FETCH_ASSOC)){
            $json[] = array('nombre' => $row['Nombre'], 'dia' => $row['Dia'], 'inicio' => $row['Inicio'], 'duracion' => $row['Duracion'], 'color' => $row['Color']);
        }
            echo json_encode($json);
    }
}

($horario = new Horario())->obtenerHorario($_GET['idHorario']);

?>