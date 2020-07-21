<?php

include_once "conexion.php";
header('Content-Type: text/txt; charset=utf-8');

class Horario{

    public function cambiarNombre($idHorario, $nuevoNombre){
        $conexion = (new Conexion())->conectar();
        $parametros = array(':idHorario'=>$idHorario, ':nuevoNombre'=>$nuevoNombre);
        $sql = "UPDATE horario SET Nombre = :nuevoNombre WHERE Id = :idHorario";
        $pdo = $conexion->prepare($sql);
        $pdo->execute($parametros);

        echo "Nombre del horario actualizado";
    }
}

($horario = new horario())->cambiarNombre($_GET['idHorario'], $_GET['nuevoNombre']);

?>