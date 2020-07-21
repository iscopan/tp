<?php
session_start();
?>

<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>TimetablePlanner - Busqueda</title>
	<link rel="stylesheet" href="css/style.css">
	<script src="js/jquery-3.4.1.min.js"></script>
	<script src="js/regexps.js"></script>
	<script src="js/busquedas.js"></script>
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
		<?php
		if(isset($_SESSION['userId']) && isset($_GET['id'])){
			if($_SESSION['userId'] == $_GET['id']){
				echo '<div class="elem"><p class="titulo">Mis horarios</p></div>
				<div class="elem"><p class="normal"><a href="javascript:nuevoHorario();">Nuevo horario</a></p></div>';
			}else{
				header('Location: index.php');
				exit();
			}
		}else if(isset($_GET['consulta'])){
			if($_GET['consulta'] != ""){
				echo '<div class="elem"><p class="titulo">Busqueda: '.$_GET['consulta'].'</p></div>';
			}else{
				header('Location: index.php');
				exit();
			}
		}else{
			header('Location: index.php');
			exit();
		}
		?>
	</div>
	<div class="contenedor" id="lista">
		<p class="titulo notfound">No se han encontrado horarios.</p>
	</div>
	<?php
	if(isset($_SESSION['userId'])){
		echo '<script type="text/javascript">
		userId = parseInt('.$_SESSION['userId'].');
		</script>';
	}
	
	if(isset($_GET['consulta'])){
		echo '<script type="text/javascript">
		consulta = "'.$_GET['consulta'].'";
		</script>';
	}
	?>
</body>
</html>