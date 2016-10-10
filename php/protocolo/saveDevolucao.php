<?php
	require('../db/db.php');
	session_start();
	//Recuperando os valores enviados pelo formulário
	$id = $_REQUEST['id'];
	$idPatrimonio = $_REQUEST['id_patrimonio'];
	$mediador = $_REQUEST['mediadorDevolucao'];
	$solicitante = $_REQUEST['solicitante'];
	$datadevolucao = $_REQUEST['datadevolucao'];
	$movimentacao = "DEVOLUÇÃO";
	
	$insertQuery = "INSERT INTO protocolos (movimentacao, id_patrimonio, mediador, solicitante, data) VALUES ('$movimentacao', '$idPatrimonio', '$mediador', '$solicitante', '$datadevolucao')";
	$updatePatrimonio = "UPDATE patrimonios SET emprestado = 0 WHERE id = '$idPatrimonio'";
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