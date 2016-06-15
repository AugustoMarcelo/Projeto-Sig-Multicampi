<?php
	require('../db/db.php');
	session_start();
	//Recuperando os valores enviados pelo formulário
	$id = $_POST['id'];
	$codigo = $_POST['codigo'];
	$nomeUnidade = $_POST['nomeUnidade'];
	$responsavel = $_POST['responsavel'];

	//Se o id for vazio, um cadastro novo é feito
	if($id == "") {
		$insertQuery = "INSERT INTO unidades (codigo, nomeUnidade, responsavel) VALUES ('$codigo', '$nomeUnidade', '$responsavel')";
		if($resultdb = $mysqli->query($insertQuery)) {
			$id = $mysqli->insert_id;
		}

	} else {
		$updateQuery = "UPDATE unidades SET codigo = '$codigo', nomeUnidade = '$nomeUnidade', responsavel = '$responsavel' WHERE id = '$id'";
		$resultdb = $mysqli->query($updateQuery);
	}

	echo json_encode(array(
		"success" => $mysqli->connect_errno == 0,
		"msg" => $mysqli->error
	));
	$mysqli->close();
?>