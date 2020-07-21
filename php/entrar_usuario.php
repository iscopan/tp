<?php

include_once "conexion.php";
header('Content-Type: text/txt; charset=utf-8');

class Usuario{

    public function entrarUsuario($correo, $pass){
        $conexion = (new Conexion())->conectar();
        $parametros = array(':correo'=>$correo, ':pass'=>$pass);
        $sql = "SELECT 1 FROM `usuario` WHERE Correo = :correo AND Pass = :pass";
        $pdo = $conexion->prepare($sql);
        $pdo->execute($parametros);

        $json = array();

        while ($row=$pdo->fetch(PDO::FETCH_ASSOC)){
            $json[] = array('resultado' => $row['1']);
        }
            echo json_encode($json);
    }
}

($usuario = new Usuario())->entrarUsuario($_GET['correo'], $_GET['pass']);

?>