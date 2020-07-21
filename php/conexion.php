<?php

header('Content-Type: text/txt; charset=utf-8');

class Conexion {
    
    private $_conn = NULL;
    public function __construct(){
    }

    public function conectar(){
        try{
            $this ->_conn = new PDO("mysql:host=localhost;dbname=timetableplanner;charset=utf8","root","");
        }catch (PDOException $e){
            echo "Error ".$e->getMessage();
        }
        return $this->_conn;
    }

}

?>