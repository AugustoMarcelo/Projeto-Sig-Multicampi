<?php
	require('../db/db.php');
	session_start();
	//Recuperando os valores enviados pelo formulário
	$id = $_REQUEST['id'];
	$tombo = $_REQUEST['tombo'];
	$denominacao = $_REQUEST['denominacao'];
	$descricao = $_REQUEST['descricao'];
	$mediador = $_REQUEST['mediador'];
	$solicitante = $_REQUEST['solicitante'];
	$dataemprestimo = $_REQUEST['dataemprestimo'];
	$movimentacao = "EMPRÉSTIMO";
	
	$insertQuery = "INSERT INTO protocolos (movimentacao, tombo, denominacao, descricao, mediador, solicitante, data) VALUES ('$movimentacao', '$tombo', '$denominacao', '$descricao', '$mediador', '$solicitante', '$dataemprestimo')";
	$updatePatrimonio = "UPDATE patrimonios SET emprestado = 1 WHERE tombo = '$tombo'";
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