<?php

include_once "conexion.php";
header('Content-Type: text/txt; charset=utf-8');

class Evento{

    public function nuevoEvento($idHorario, $nombre, $dia, $inicio, $duracion, $color){
        $conexion = (new Conexion())->conectar();
        $parametros = array(':idHorario'=>$idHorario, ':nombre'=>$nombre, ':dia'=>$dia, ':inicio'=>$inicio, ':duracion'=>$duracion, ':color'=>$color);
        $sql = "INSERT INTO `evento` VALUES (:idHorario, :dia, :inicio, :nombre, :duracion, :color)";
        $pdo = $conexion->prepare($sql);
        $pdo->execute($parametros);

        echo "Evento insertado";
    }
}

($evento = new Evento())->nuevoEvento($_GET['idHorario'], $_GET['nombre'], $_GET['dia'], $_GET['inicio'], $_GET['duracion'], $_GET['color']);

?>