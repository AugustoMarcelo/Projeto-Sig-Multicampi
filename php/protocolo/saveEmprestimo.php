<?php
	require('../db/db.php');
	session_start();
	//Recuperando os valores enviados pelo formulário
	$id = $_REQUEST['id'];
	$patrimonioId = $_REQUEST['id_patrimonio'];
	$mediador = $_REQUEST['mediador'];
	$solicitante = $_REQUEST['solicitante'];
	$dataemprestimo = $_REQUEST['dataemprestimo'];
	$movimentacao = "EMPRÉSTIMO";
	
	$insertQuery = "INSERT INTO protocolos (movimentacao, id_patrimonio, mediador, solicitante, data) VALUES ('$movimentacao', '$patrimonioId', '$mediador', '$solicitante', '$dataemprestimo')";
	$updatePatrimonio = "UPDATE patrimonios SET emprestado = 1 WHERE id = '$patrimonioId'";
	$resultUpdate = $mysqli->query($updatePatrimonio);
	if($resultInsert = $mysqli->query($insertQuery)) {
		$id = $mysqli->insert_id;
	}

	echo json_encode(array(
		"success" => $mysqli->connect_errno == 0,
		"msg" => $mysqli->error
	));
	$mysqli->close();
?>