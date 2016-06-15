<?php

	require('../db/db.php');
	session_start();
	$novaSenha = $_POST['novasenha'];
	$idUserLogado = null;
	if(isset($_SESSION['user_id'])) {
		$idUserLogado = $_SESSION['user_id'];
	}

	$sql = "UPDATE user SET password = '$novaSenha' WHERE id = '$idUserLogado' LIMIT 1";
	$resultSet = $mysqli->query($sql);

	echo json_encode(array(
		"success" => $mysqli->connect_errno == 0,
		"msg" => $mysqli->error
	));

	$mysqli->close();
?>