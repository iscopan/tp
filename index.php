<?php
session_start();
?>

<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>TimetablePlanner - Inicio</title>
	<link rel="stylesheet" href="css/style.css">
	<script src="js/jquery-3.4.1.min.js"></script>
	<script src="js/regexps.js"></script>
	<script src="js/leerformularios.js"></script>
</head>
<body>
	<div class="contenedor" id="cabecera">
		<div class="elem"><a href="#"><img src="src/icon.png"></a></div>
		<?php
		if(!isset($_SESSION['userId'])){
			echo '<div class="elem"><a href="#registro">Registro</a><a href="#entrar">Entrar</a></div>';
		}else{
			echo '<div class="elem"><a href="busqueda.php?id='.$_SESSION['userId'].'">Mis horarios</a></div>';
		}
		?>
	</div>
	<div class="img" id="img1"></div>
	<div class="contenedor" id="buscar">
		<div class="elem">
			<p class="titulo">Buscar horarios</p>
			<form action="busqueda.php">
				<p><input id="busqueda" type="search" name="consulta" placeholder="Nombre del horario"></p>
			</form>
		</div>
	</div>
	<div class="contenedor" id="contenido">
		<div class="elem addMarginTop">
			<div class="img" id="img2"></div>
			<p class="titulo">Crea horarios</p>
		</div>
		<div class="elem addMarginTop">
			<div class="img" id="img3"></div>
			<p class="titulo">Guardalos</p>
		</div>
		<div class="elem addMarginTop">
			<div class="img" id="img4"></div>
			<p class="titulo">Y compartelos</p>
		</div>
	</div>
	<a id="entrar"></a><a id="registro"></a>
	<div class="img" id="img1"></div>
	<div class="contenedor" id="login">
	<?php

	if(!isset($_SESSION['userId'])){
		echo '<div class="elem">
				<p class="titulo">Registro</p>
					<form>
						<p><input id="ruser" type="text" name="user" placeholder="Nombre de usuario"></p>
						<p><input id="rcorreo" type="text" name="correo" placeholder="Dirección de correo"></p>
						<p><input id="rpass" type="password" name="pass" placeholder="Contraseña"></p>
						<p><input id="rpass2" type="password" name="pass2" placeholder="Repetir la contraseña"></p>
						<p><input type="button" value="Enviar" onclick="comprobarRegistro()"></p>
					</form>
				</div>
				<div class="elem">
					<form>
						<p class="titulo">Entrar</p>
						<p><input id="lcorreo" type="text" name="correo" placeholder="Dirección de correo"></p>
						<p><input id="lpass" type="password" name="pass" placeholder="Contraseña"></p>
						<p><input type="button" value="Entrar" onclick="comprobarLogin()"></p>
					</form>
				</div>';
	}else{
		echo 
		'<div class="elem">
			<p class="titulo">Conectado como '.$_SESSION['userName'].'</p>
			<p><input type="button" value="Cerrar sesión" onclick="cerrarSesion()"></p>
		</div>';
	}
	?>
	</div>
	<div class="img" id="img1"></div>
	<div class="footer">
		<p>Francisco de la Puente</p>
	</div>
</body>
</html>