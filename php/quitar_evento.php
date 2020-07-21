<?php

include_once "conexion.php";
header('Content-Type: text/txt; charset=utf-8');

class Evento{

    public function quitarEvento($idHorario, $dia, $inicio){
        $conexion = (new Conexion())->conectar();
        $parametros = array(':idHorario'=>$idHorario, ':dia'=>$dia, ':inicio'=>$inicio);
        $sql = "DELETE FROM `evento` WHERE Horario = :idHorario AND Dia = :dia AND Inicio = :inicio";
        $pdo = $conexion->prepare($sql);
        $pdo->execute($parametros);

        echo "Evento eliminado";
    }
}

($evento = new Evento())->quitarEvento($_GET['idHorario'], $_GET['dia'], $_GET['inicio']);

?>