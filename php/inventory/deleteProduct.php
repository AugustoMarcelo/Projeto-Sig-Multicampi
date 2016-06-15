<?php
	require("../db/db.php");
	session_start();
	$id = $_POST['id']; 
	$picture = $_POST['picture'];
	if($picture){
		$folderPicture = '../../resources/productImages';
		$result = unlink("$folderPicture/$picture"); //$result guarda true ou false, dependendo do resultado da exclusão da imagem
	}
	$deleteQuery = "DELETE FROM Product WHERE id='$id'";
	$resultdb = $mysqli->query($deleteQuery);	
	echo json_encode(array(
		"success" => $mysqli->connect_errno == 0,
		"msg" => $mysqli->error,
		"picture" => $picture
	));
	/* close connection */
	$mysqli->close();
?>