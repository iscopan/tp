<?php

include_once "conexion.php";
header('Content-Type: text/txt; charset=utf-8');

class Horario{

    public function cambiarVisualizacion($idHorario, $visualizacion){
        $conexion = (new Conexion())->conectar();
        $parametros = array(':idHorario'=>$idHorario, ':visualizacion'=>$visualizacion);
        $sql = "UPDATE horario SET Visible = :visualizacion WHERE Id = :idHorario";
        $pdo = $conexion->prepare($sql);
        $pdo->execute($parametros);

        echo "Visualizacion cambiada";
    }
}

($horario = new horario())->cambiarVisualizacion($_GET['idHorario'], $_GET['visualizacion']);

?>