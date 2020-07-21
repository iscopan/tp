<?php
session_start();
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>TimetablePlanner - Horario</title>
    <link rel="stylesheet" href="css/style.css">
    <script src="js/jquery-3.4.1.min.js"></script>
    <script src="js/regexps.js"></script>
    <script src="js/generadorhorarios.js"></script>
</head>
<body>
    <div class="contenedor" id="cabecera">
		<div class="elem"><a href="index.php"><img src="src/icon.png"></a></div>
		<?php
		if(!isset($_SESSION['userId'])){
			echo '<div class="elem"><a href="index.php#registro">Registro</a><a href="index.php#entrar">Entrar</a></div>';
		}else{
			echo '<div class="elem"><a href="busqueda.php?id='.$_SESSION['userId'].'">Mis horarios</a></div>';
		}
		?>
	</div>
	<div class="contenedor" id="encabezado">
		<div class="elem"><p class="titulo" id="titulohorario">Nombre horario</p></div>
        <?php
        if(isset($_GET['editar'])){
            echo '<div class="elem"><p class="normal"><a href="javascript:nuevoEvento();">Añadir evento</a><a href="javascript:cambiarNombre();">Cambiar nombre</a></p></div>';
        }
        ?>
    </div>
    <div class="horario" id="horario"></div>
    <?php
    if(isset($_GET['editar'])){
        echo '<div id="id01" class="modal">
            <form class="modal-content animate">
                <p class="titulo">Nuevo evento</p>
                <p class="normal">
                    Nombre del evento:<br>
                    <input id="nombre" type="text">
                </p>
                <p class="normal">
                    Día de la semana:<br>
                    <input id="rlunes" type="radio" name="dia" checked> Lunes<br>
                    <input id="rmartes" type="radio" name="dia"> Martes<br>
                    <input id="rmiercoles" type="radio" name="dia"> Miercoles<br>
                    <input id="rjueves" type="radio" name="dia"> Jueves<br>
                    <input id="rviernes" type="radio" name="dia"> Viernes
                </p>
                <p class="normal">
                    Inicio:<br>
                    <input id="inicio" type="number" min="0" max="23">
                </p>
                <p class="normal">
                    Duración:<br>
                    <input id="duracion" type="number" min="1" max="8">
                </p>
                <p class="normal">
                    Color:<br>
                    <input id="rojo" type="radio" name="color" checked> Rojo<br>
                    <input id="morado" type="radio" name="color"> Morado<br>
                    <input id="azul" type="radio" name="color"> Azul<br>
                    <input id="verde" type="radio" name="color"> Verde<br>
                    <input id="amarillo" type="radio" name="color"> Amarillo
                </p>
                <p class="normal">
                    <input id="enviar" type="button" value="Enviar" onclick="enviarEvento()"> <input id="cancelar" type="button" value="Cancelar" onclick="botonCancelar()">
                </p>
            </form>
        </div>';
    }

	if(isset($_SESSION['userId'])){
		echo '<script type="text/javascript">
		userId = '.$_SESSION['userId'].';
		</script>';
	}else if(isset($_GET['editar'])){
        header('Location: index.php');
        exit();
    }
	
	if(isset($_GET['editar'])){
		echo '<script type="text/javascript">
        id = "'.$_GET['editar'].'";
        modo = "editar";
		</script>';
    }else if(isset($_GET['ver'])){
		echo '<script type="text/javascript">
        id = "'.$_GET['ver'].'";
        modo = "ver";
		</script>';
	}else{
        header('Location: index.php');
        exit();
    }
	?>
</body>
</html>