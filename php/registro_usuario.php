<?php

include_once "conexion.php";
header('Content-Type: text/txt; charset=utf-8');

class Usuario{

    public function registroUsuario($user, $correo, $pass){
        $conexion = (new Conexion())->conectar();
        $parametros = array(':user'=>$user, ':correo'=>$correo, ':pass'=>$pass);
        $sql = "INSERT INTO `usuario` VALUES (NULL, :user, :correo, :pass)";
        $pdo = $conexion->prepare($sql);
        $pdo->execute($parametros);

        echo "Usuario registrado";
    }
}

($usuario = new Usuario())->registroUsuario($_GET['user'], $_GET['correo'], $_GET['pass']);

?>