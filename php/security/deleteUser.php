<?php
	require("../db/db.php");
	session_start();
	$delete = true;
	$id = $_POST['id']; /* ID do usuário que está sendo deletado*/
	$picture = $_POST['picture'];
	/* Resgatando o usuário logado no momento */
	if($_SESSION['authenticated'] == "yes") {
		$usuarioLogado = $_SESSION["user_id"];
		if($usuarioLogado == $id) {
			$delete = false;
		}
	}
	if($delete == true) {
		if($picture) {
			$folderPicture = '../../resources/profileImages';
			$result = unlink("$folderPicture/$picture"); //$result guarda true ou false, dependendo do resultado da exclusão da imagem	
		}	
		$deleteQuery = "DELETE FROM User WHERE id='$id'";
		$resultdb = $mysqli->query($deleteQuery);	
	}
	echo json_encode(array(
		"success" => $mysqli->connect_errno == 0,
		"msg" => $mysqli->error,
		"deleted" => $delete
	));
	/* close connection */
	$mysqli->close();
?>