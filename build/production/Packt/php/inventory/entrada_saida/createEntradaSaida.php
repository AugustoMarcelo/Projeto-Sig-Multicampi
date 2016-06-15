<?php
	require('../../db/db.php');

	$info = $_POST['data'];
	$data = json_decode($info);
	
	$produto = $data->produto;
	$user_id = $data->User_id;
	$quantidade = $data->quantidade;
	$destino = $data->destino;
	$dataOp = $data->dataOperacao;
	$observacoes = $data->observacoes;	
	$operacao = $data->operacao;
	
	$insertQuery = "INSERT INTO estoque (produto, User_id, quantidade, destino, dataOperacao, observacoes, operacao)";
	$insertQuery .= "VALUES ('$produto', '$user_id', '$quantidade', '$destino', '$dataOp', '$observacoes', '$operacao')";
	if($resultdb = $mysqli->query($insertQuery)) {
		$id = $mysqli->insert_id;
	}


	echo json_encode(array(
		"success" => $mysqli->error == '',
		"msg" => $mysqli->error,
		"data" => array(
			"id" => $mysqli->insert_id, //mysql_insert_id(),
			"produto" => $produto,
			"id_usuario" => $user_id,
			"quantidade" => $quantidade,
			"destino" => $destino,
			"dataOperacao" => $dataOp,
			"observacoes" => $observacoes,
			"operacao" => $operacao
		)
	));
?>