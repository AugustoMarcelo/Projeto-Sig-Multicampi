<?php
	require("../db/db.php");
	session_start();
	$id = $_POST['id'];
	$imagem = $_POST['imagem'];
	//Se o patrimônio a ser deletado contiver uma imagem, exclua-a
	if($imagem) {
		$diretorioImagem = '../../resources/patrimonioImages';
		$result = unlink("$diretorioImagem/$imagem"); //Recebe TRUE ou FALSE de acordo com o sucesso da exclusão
	}
	$deleteQuery = "DELETE FROM patrimonios WHERE id = '$id'";
	$resultdb = $mysqli->query($deleteQuery);
	echo json_encode(array(
		"success" => $mysqli->connect_errno == 0,
		"msg" => $mysqli->error
	));
	//Fecha a conexão
	$mysqli->close();
?>